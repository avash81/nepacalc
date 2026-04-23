const https = require('https');
const fs = require('fs');

const url = "https://1drv.ms/x/c/1114E29DFFE3E69C/IQANycLoGslGQYyLnDo1oDi9AZnAB0uf0aMfbYcxukPSa8Q?e=dU0gpK";

https.get(url, (res) => {
    console.log("Status:", res.statusCode);
    console.log("Headers:", res.headers);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location;
        console.log("Redirected to:", redirectUrl);
        
        // Convert web link to download link
        // Usually from https://onedrive.live.com/:x:/g/personal/... to https://onedrive.live.com/download?resid=...&authkey=...
        // Or simple append ?download=1
        const downloadUrl = redirectUrl.replace('?', '?download=1&');
        console.log("Attempting download from:", downloadUrl);
        
        const file = fs.createWriteStream("data.xlsx");
        https.get(downloadUrl, (dRes) => {
             console.log("Download status:", dRes.statusCode);
             if (dRes.statusCode >= 300 && dRes.statusCode < 400 && dRes.headers.location) {
                 const finalUrl = new URL(dRes.headers.location, downloadUrl).toString();
                 console.log("Final redirect to:", finalUrl);
                 https.get(finalUrl, (fRes) => {
                     fRes.pipe(file);
                     file.on('finish', () => {
                         file.close();
                         console.log("Download complete.");
                     });
                 });
             } else {
                 dRes.pipe(file);
                 file.on('finish', () => {
                     file.close();
                     console.log("Download complete.");
                 });
             }
        }).on('error', (err) => console.error("Download Error:", err));
    }
}).on('error', (err) => {
    console.error("Error:", err);
});
