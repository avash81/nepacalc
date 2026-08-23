<?php
/**
 * rates.php — NepaCalc Live Rate API
 * Served at: nepacalc.com/api/rates.php
 *
 * This is a READ-ONLY endpoint. It does NOT scrape FENEGOSIDA.
 * All scraping is done by market-engine.php (cron job).
 * This file simply serves the pre-fetched live-rates.json.
 *
 * This means:
 *   - Zero latency (no outbound HTTP)
 *   - Always returns data (even if FENEGOSIDA is down)
 *   - Safe for high traffic
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-store, no-cache, must-revalidate');

$rootDir    = dirname(__DIR__);                   // public_html/
$dataFile   = $rootDir . '/data/live-rates.json'; // written by market-engine.php

// ── Serve live-rates.json if available and reasonably fresh ──────────────────
if (file_exists($dataFile)) {
    $ageSeconds = time() - filemtime($dataFile);
    $data = json_decode(file_get_contents($dataFile), true);

    if ($data && isset($data['gold']['tolaNPR']) && $data['gold']['tolaNPR'] > 200000) {
        $data['_ageSeconds']  = $ageSeconds;
        $data['_servedBy']    = 'rates.php (read live-rates.json)';
        // Mark as stale if file is older than 5 minutes (cron may have stopped)
        if ($ageSeconds > 300) {
            $data['stale'] = true;
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// ── Fallback: live-rates.json missing or corrupt — fetch directly ─────────────
// This is a safety net only. Normally market-engine.php keeps the file fresh.
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://www.fenegosida.org/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 12,
    CURLOPT_CONNECTTIMEOUT => 6,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 3,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_ENCODING       => 'gzip, deflate',
    CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; NepaCalcBot/2.0; +https://nepacalc.com/)',
    CURLOPT_HTTPHEADER     => ['Accept: text/html,*/*', 'Accept-Language: en-US,en;q=0.9'],
]);
$html     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

$fine = $tejabi = $silver = 0;
$parsed = false;

if ($html && $httpCode === 200) {
    if (preg_match_all("/\['(\d{8})',\s*([2-3]\d{5}),\s*(\d+)\]/", $html, $gM)) {
        $i      = count($gM[0]) - 1;
        $fine   = (int)$gM[2][$i];
        $tejabi = (int)$gM[3][$i];
        $parsed = ($fine >= 200000 && $fine <= 600000);
    }
    if (preg_match_all("/'(\d{8})',\s*([3-7]\d{3}),\s*\d+/", $html, $sM)) {
        $si     = count($sM[0]) - 1;
        $s      = (int)$sM[2][$si];
        $silver = ($s > 3000 && $s < 8000) ? $s : 0;
    }
}

$tz  = new DateTimeZone('Asia/Kathmandu');
$now = new DateTime('now', $tz);

if ($parsed) {
    echo json_encode([
        'gold'        => ['tolaNPR' => $fine, 'tejabiTolaNPR' => $tejabi ?: ($fine - 700)],
        'silver'      => ['tolaNPR' => $silver ?: 4310],
        'date'        => $now->format('Y-m-d'),
        'fetchedAt'   => $now->format('Y-m-d\TH:i:sP'),
        'timeNPT'     => $now->format('h:i A') . ' NPT',
        'source'      => 'FENEGOSIDA (direct fallback)',
        'verified'    => true,
        'fetchFailed' => false,
        '_servedBy'   => 'rates.php (direct fetch fallback)',
    ], JSON_UNESCAPED_UNICODE);
} else {
    // Last resort hardcoded
    echo json_encode([
        'gold'        => ['tolaNPR' => 284000, 'tejabiTolaNPR' => 283300],
        'silver'      => ['tolaNPR' => 4310],
        'date'        => $now->format('Y-m-d'),
        'fetchedAt'   => $now->format('Y-m-d\TH:i:sP'),
        'timeNPT'     => $now->format('h:i A') . ' NPT',
        'source'      => 'FENEGOSIDA Hardcoded Fallback',
        'verified'    => false,
        'fetchFailed' => true,
        'error'       => $curlErr ?: "HTTP $httpCode",
        '_servedBy'   => 'rates.php (hardcoded last resort)',
    ], JSON_UNESCAPED_UNICODE);
}
