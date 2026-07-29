<?php
/**
 * rates.php — NepaCalc Live Rate Proxy
 * Served from cPanel at: nepacalc.com/api/rates.php
 *
 * Fetches official FENEGOSIDA gold & silver prices server-side.
 * 1-hour file cache so repeated browser calls are instant.
 * No CORS issues — same domain as the site.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-store, no-cache');

// ── Cache ────────────────────────────────────────────────────────────────────
$cacheFile  = sys_get_temp_dir() . '/nepacalc_fenegosida.json';
$cacheMaxAge = 120; // 2 minutes — checks FENEGOSIDA frequently for near-real-time updates

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheMaxAge) {
    $cached       = json_decode(file_get_contents($cacheFile), true);
    $cached['cached']    = true;
    $cached['cacheAgeSeconds'] = time() - filemtime($cacheFile);
    echo json_encode($cached);
    exit;
}

// ── Fetch from FENEGOSIDA ────────────────────────────────────────────────────
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://www.fenegosida.org/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 3,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_ENCODING       => 'gzip, deflate',
    CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; NepaCalcBot/2.0; +https://nepacalc.com)',
    CURLOPT_HTTPHEADER     => [
        'Accept: text/html,application/xhtml+xml,*/*',
        'Accept-Language: en-US,en;q=0.9',
    ],
]);

$html     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

// ── Parse ────────────────────────────────────────────────────────────────────
$fine   = 0;
$tejabi = 0;
$silver = 0;
$parsed = false;

if ($html && $httpCode === 200) {
    // Gold: ['YYYYMMDD', finePrice, tejabiPrice]
    preg_match_all("/\['\d{8}',([2-3]\d{5}),(\d+)\]/", $html, $goldM);
    if (!empty($goldM[1])) {
        $i      = count($goldM[1]) - 1;
        $fine   = (int)$goldM[1][$i];
        $tejabi = (int)$goldM[2][$i];
    }

    // Silver: 'YYYYMMDD',silverPrice,something
    preg_match_all("/'\d{8}',([3-7]\d{3}),\d+/", $html, $silverM);
    if (!empty($silverM[1])) {
        $si     = count($silverM[1]) - 1;
        $silver = (int)$silverM[1][$si];
    }

    // Validate gold is in a believable range
    if ($fine >= 200000 && $fine <= 500000) {
        $parsed = true;
    }
}

// ── Build response ────────────────────────────────────────────────────────────
if ($parsed) {
    $tz  = new DateTimeZone('Asia/Kathmandu');
    $now = new DateTime('now', $tz);

    $result = [
        'gold'      => ['tolaNPR' => $fine, 'tejabiTolaNPR' => $tejabi],
        'silver'    => ['tolaNPR' => $silver > 0 ? $silver : 4320],
        'date'      => $now->format('Y-m-d'),
        'time'      => $now->format('h:i A') . ' NPT',
        'source'    => 'FENEGOSIDA',
        'updatedAt' => (new DateTime('now'))->format('c'),
        'verified'  => true,
        'cached'    => false,
    ];

    // Save to cache
    file_put_contents($cacheFile, json_encode($result));
    echo json_encode($result);

} else {
    // Fetch failed — return stale cache if available
    if (file_exists($cacheFile)) {
        $stale          = json_decode(file_get_contents($cacheFile), true);
        $stale['cached'] = true;
        $stale['stale']  = true;
        $stale['error']  = $curlErr ?: "HTTP $httpCode — parse failed";
        echo json_encode($stale);
    } else {
        // Absolute fallback — current known official rates
        echo json_encode([
            'gold'     => ['tolaNPR' => 283200, 'tejabiTolaNPR' => 282500],
            'silver'   => ['tolaNPR' => 4320],
            'date'     => date('Y-m-d'),
            'source'   => 'FENEGOSIDA Hardcoded Fallback',
            'verified' => false,
            'error'    => $curlErr ?: "HTTP $httpCode",
        ]);
    }
}
