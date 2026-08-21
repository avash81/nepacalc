import fs from "fs";

// 1. Read files
const seoFile = "src/app/market-rates/silver-price-nepal/SilverSeoSection.tsx";
const pageFile = "src/app/market-rates/silver-price-nepal/page.tsx";
const histFile = "src/app/market-rates/silver-price-nepal/SilverHistoricalData.tsx";

const seoContent = fs.readFileSync(seoFile, "utf-8");
const pageContent = fs.readFileSync(pageFile, "utf-8");
const histContent = fs.readFileSync(histFile, "utf-8");

// We will just do git restore again
require("child_process").execSync("git restore " + seoFile + " " + pageFile + " " + histFile);
console.log("Restored files");
