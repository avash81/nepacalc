<?php
/**
 * market-engine.php — NepaCalc Market Data Engine v2
 *
 * SERVER-SIDE CRON JOB — runs every minute via cPanel Cron.
 * Internal throttle = 45 seconds (so at most one FENEGOSIDA fetch every 45s).
 *
 * SETUP:
 *   cPanel → Cron Jobs → Every Minute:
 *   php /home/YOURUSERNAME/public_html/api/market-engine.php > /dev/null 2>&1
 *
 * OUTPUTS:
 *   public_html/data/live-rates.json   ← full data (read by browser)
 *   public_html/data/rates-version.txt ← just a hash (browser polls this — 50 bytes)
 *
 * FLOW:
 *   cron (every 1min) → engine fetches FENEGOSIDA → writes live-rates.json
 *   browser polls /data/rates-version.txt every 10s (50 bytes — near zero cost)
 *   when hash changes → browser fetches full live-rates.json → UI updates instantly
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate');
set_time_limit(30);

// ── Paths ─────────────────────────────────────────────────────────────────────
$rootDir     = dirname(__DIR__);
$outputFile  = $rootDir . '/data/live-rates.json';
$versionFile = $rootDir . '/data/rates-version.txt';
$logFile     = sys_get_temp_dir() . '/nepacalc_engine.log';

// ── Internal throttle: only FETCH if last successful fetch was >45s ago ───────
// (cron fires every minute; we throttle internally to avoid hammering FENEGOSIDA)
$lastFetch = file_exists($outputFile) ? filemtime($outputFile) : 0;
$age       = time() - $lastFetch;

if ($age < 45) {
    // Still fresh — serve cached data
    $data = json_decode(@file_get_contents($outputFile) ?: '{}', true) ?: [];
    $data['_status']         = 'cached';
    $data['_cacheAgeSeconds'] = $age;
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ── Timezone ──────────────────────────────────────────────────────────────────
$tz  = new DateTimeZone('Asia/Kathmandu');
$now = new DateTime('now', $tz);

// ── Fetch FENEGOSIDA ──────────────────────────────────────────────────────────
function curlFetch(string $url, int $timeout = 10): array {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => $timeout,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 4,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_ENCODING       => 'gzip, deflate',
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; NepaCalcBot/2.0; +https://nepacalc.com/)',
        CURLOPT_HTTPHEADER     => [
            'Accept: text/html,application/xhtml+xml,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
            'Connection: keep-alive',
        ],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);
    return ['body' => $body ?: '', 'code' => $code, 'error' => $err];
}

function parseRates(string $html): array {
    $result = [];

    // ── Gold: ['YYYYMMDD', finePrice, tejabiPrice] ────────────────────────────
    if (preg_match_all("/\['(\d{8})',\s*([2-3]\d{5}),\s*(\d+)\]/", $html, $gM)) {
        $i      = count($gM[0]) - 1;
        $fine   = (int)$gM[2][$i];
        $tejabi = (int)$gM[3][$i];
        $date   = $gM[1][$i]; // e.g. "20260730"
        if ($fine >= 200000 && $fine <= 600000) {
            $result['gold'] = [
                'tolaNPR'       => $fine,
                'tejabiTolaNPR' => $tejabi > 0 ? $tejabi : ($fine - 700),
                'dataDate'      => substr($date,0,4).'-'.substr($date,4,2).'-'.substr($date,6,2),
            ];
        }
    }

    // ── Silver: 'YYYYMMDD',price,changeAmt ────────────────────────────────────
    if (preg_match_all("/'(\d{8})',\s*([3-7]\d{3}),\s*[-]?\d+/", $html, $sM)) {
        $si     = count($sM[0]) - 1;
        $silver = (int)$sM[2][$si];
        $sDate  = $sM[1][$si];
        if ($silver > 3000 && $silver < 8000) {
            $result['silver'] = [
                'tolaNPR'  => $silver,
                'dataDate' => substr($sDate,0,4).'-'.substr($sDate,4,2).'-'.substr($sDate,6,2),
            ];
        }
    }

    return isset($result['gold']) ? $result : [];
}

// ── Try sources in order ──────────────────────────────────────────────────────
$sources = [
    'direct'   => 'https://www.fenegosida.org/',
    'proxy_a'  => 'https://corsproxy.io/?url=' . urlencode('https://www.fenegosida.org/'),
    'proxy_b'  => 'https://api.allorigins.win/raw?url=' . urlencode('https://www.fenegosida.org/'),
];

$parsed       = [];
$fetchSource  = '';

foreach ($sources as $name => $url) {
    $res = curlFetch($url, 10);
    if ($res['code'] === 200 && strlen($res['body']) > 1000) {
        $parsed = parseRates($res['body']);
        if (!empty($parsed)) {
            $fetchSource = $name;
            break;
        }
    }
}

// ── Read existing data for sanity checks and stale-fallback ──────────────────
$existing = [];
if (file_exists($outputFile)) {
    $existing = json_decode(file_get_contents($outputFile), true) ?: [];
}

function sanityOk($new, $old, $maxDiff): bool {
    return (!$old || !$new) ? true : abs($new - $old) <= $maxDiff;
}

// ── Build final data ──────────────────────────────────────────────────────────
if (!empty($parsed) && isset($parsed['gold'])) {
    $newGold    = $parsed['gold']['tolaNPR'];
    $newTejabi  = $parsed['gold']['tejabiTolaNPR'];
    $newSilver  = $parsed['silver']['tolaNPR'] ?? 0;
    $oldGold    = $existing['gold']['tolaNPR'] ?? 0;
    $oldSilver  = $existing['silver']['tolaNPR'] ?? 0;

    $goldOk   = sanityOk($newGold, $oldGold, 25000);
    $silverOk = !$newSilver || sanityOk($newSilver, $oldSilver, 3000);

    $finalGold   = $goldOk   ? $newGold   : ($oldGold ?: 284000);
    $finalTejabi = $goldOk   ? $newTejabi : ($existing['gold']['tejabiTolaNPR'] ?? $finalGold - 700);
    $finalSilver = ($newSilver && $silverOk) ? $newSilver : ($oldSilver ?: 4310);
    $dataDate    = $parsed['gold']['dataDate'] ?? $now->format('Y-m-d');

    // Version hash: changes ONLY when gold, silver, or date changes
    $versionHash = substr(md5($finalGold . '|' . $finalSilver . '|' . $dataDate), 0, 12);

    $writeData = [
        'gold'        => ['tolaNPR' => $finalGold, 'tejabiTolaNPR' => $finalTejabi],
        'silver'      => ['tolaNPR' => $finalSilver],
        'date'        => $dataDate,
        'fetchedAt'   => $now->format('Y-m-d\TH:i:sP'),
        'timeNPT'     => $now->format('h:i A') . ' NPT',
        'source'      => 'FENEGOSIDA',
        'fetchSource' => $fetchSource,
        'verified'    => true,
        'fetchFailed' => false,
        '_version'    => $versionHash,
        '_status'     => 'fresh',
    ];

} elseif (!empty($existing['gold'])) {
    // Fetch failed — keep stale data, just note it
    $writeData              = $existing;
    $writeData['stale']     = true;
    $writeData['fetchFailed'] = true;
    $writeData['_status']   = 'stale';
    $writeData['lastAttemptAt'] = $now->format('Y-m-d\TH:i:sP');
    // Keep the existing _version — stale data means no version change
    $versionHash = $existing['_version'] ?? substr(md5(($existing['gold']['tolaNPR'] ?? 0) . '|' . ($existing['silver']['tolaNPR'] ?? 0) . '|' . ($existing['date'] ?? '')), 0, 12);
    $writeData['_version'] = $versionHash;

} else {
    // Nothing at all — hardcoded safe defaults
    $versionHash = substr(md5('284000|4310|' . $now->format('Y-m-d')), 0, 12);
    $writeData = [
        'gold'        => ['tolaNPR' => 284000, 'tejabiTolaNPR' => 283300],
        'silver'      => ['tolaNPR' => 4310],
        'date'        => $now->format('Y-m-d'),
        'fetchedAt'   => $now->format('Y-m-d\TH:i:sP'),
        'timeNPT'     => $now->format('h:i A') . ' NPT',
        'source'      => 'FENEGOSIDA Hardcoded Default',
        'verified'    => false,
        'fetchFailed' => true,
        '_version'    => $versionHash,
        '_status'     => 'hardcoded_fallback',
    ];
}

// ── Write live-rates.json ─────────────────────────────────────────────────────
$dataDir = dirname($outputFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}
$jsonStr = json_encode($writeData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents($outputFile, $jsonStr, LOCK_EX);

// ── Write rates-version.txt ───────────────────────────────────────────────────
// Browser polls this tiny file every 10 seconds (< 60 bytes).
// When hash changes → browser fetches full live-rates.json immediately.
// Format: "HASH GOLD SILVER\n"
// $versionHash is already set correctly in the if/elseif/else block above.
$versionStr = $versionHash . ' ' . $writeData['gold']['tolaNPR'] . ' ' . ($writeData['silver']['tolaNPR'] ?? 0) . "\n";
file_put_contents($versionFile, $versionStr, LOCK_EX);

// ── Log (ring buffer, last 200 lines) ─────────────────────────────────────────
$logLine = $now->format('Y-m-d H:i:s') . ' | '
    . 'Gold=' . ($writeData['gold']['tolaNPR'] ?? '?')
    . ' Silver=' . ($writeData['silver']['tolaNPR'] ?? '?')
    . ' Date=' . ($writeData['date'] ?? '?')
    . ' Src=' . ($fetchSource ?: 'stale')
    . ' Status=' . ($writeData['_status'] ?? '?') . "\n";

$existing_log = file_exists($logFile) ? array_slice(file($logFile), -199) : [];
file_put_contents($logFile, implode('', $existing_log) . $logLine, LOCK_EX);

// ── Response ──────────────────────────────────────────────────────────────────
echo json_encode([
    'success'     => true,
    'data'        => $writeData,
    'version'     => $versionHash,
    'versionStr'  => trim($versionStr),
    'logLine'     => trim($logLine),
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
