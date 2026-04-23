const fs = require('fs');
const https = require('https');

const url = "https://onedrive.live.com/download?resid=1114E29DFFE3E69C!123&authkey=!AZnAB0uf0aMfbYc"; // I don't know the exact authkey.

// Instead of downloading directly which can be tricky with OneDrive auth logic, let's just use playwright which is likely installed.
const { execSync } = require('child_process');
try {
  execSync('npm list playwright', { stdio: 'ignore' });
  console.log('Playwright is installed');
} catch {
  console.log('Playwright not installed');
}
