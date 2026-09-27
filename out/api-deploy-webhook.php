<?php
// Fast, robust, and credential-less cPanel Git deployment webhook
// This triggers the native cPanel Git version control update mechanism

// A simple secret to prevent unauthorized users from triggering the deployment
$secret = "nepacalc_deploy_2026";

if (!isset($_GET['secret']) || $_GET['secret'] !== $secret) {
    http_response_code(403);
    die("Unauthorized access.");
}

// Execute the cPanel UAPI command to pull from the repository
// UAPI is the native cPanel API tool available in the command line
$output = shell_exec('/usr/bin/uapi VersionControl update repository_root=/home/nepacalc/repositories/nepacalc 2>&1');

echo "Deployment Triggered Successfully.\n";
echo "<pre>" . htmlspecialchars($output) . "</pre>";
?>
