const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Load API key
require('dotenv').config({ path: '.env.local' });
const API_KEYS = (process.env.GEMINI_API_KEYS || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").split(',').map(k => k.trim()).filter(k => k);

if (API_KEYS.length === 0) {
  console.error("FATAL ERROR: No API keys found in GEMINI_API_KEYS or NEXT_PUBLIC_GEMINI_API_KEY");
  process.exit(1);
}

let keyIndex = 0;
function getNextKey() {
  const key = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return key;
}

const SEO_FILE = path.join(__dirname, '../src/data/seo-content.tsx');
const NEPAL_FILE = path.join(__dirname, '../src/data/seo/nepal.tsx');

// 1. Build Keyword Bank from research files
console.log("Loading research keywords...");
const keywordDir = path.join(__dirname, '../research_keyword');
const files = fs.readdirSync(keywordDir);
let allKeywords = [];

for (const file of files) {
  if (file.endsWith('.csv') || file.endsWith('.xlsx')) {
    try {
      const workbook = xlsx.readFile(path.join(keywordDir, file));
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const headers = data[0] || [];
      const keywordColIdx = headers.findIndex(h => typeof h === 'string' && h.toLowerCase().includes('keyword'));
      
      if (keywordColIdx !== -1) {
        for (let i = 1; i < data.length; i++) {
            if (data[i][keywordColIdx]) {
                allKeywords.push(String(data[i][keywordColIdx]).toLowerCase());
            }
        }
      }
    } catch(e) {}
  }
}
// Deduplicate keywords
allKeywords = [...new Set(allKeywords)];
console.log(`Loaded ${allKeywords.length} unique keywords from research files.`);

// Function to find relevant keywords for a specific calculator slug
function getKeywordsForSlug(slug) {
  const parts = slug.split('-');
  return allKeywords
    .filter(kw => parts.some(p => kw.includes(p)))
    .sort((a, b) => b.length - a.length) // prioritize longer tail keywords
    .slice(0, 25); // Top 25 keywords per calculator
}

async function generateWithRetry(slug, keywords, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const result = await generate1500WordContent(slug, keywords);
      if (result) return result;
    } catch (e) {
      console.error(`Attempt ${i+1} failed for ${slug}`);
    }
    console.log(`Retrying in 180s (Quota Reset)...`);
    await new Promise(r => setTimeout(r, 180000));
  }
  console.log(`Failed all attempts for ${slug}. Moving to next.`);
  return null;
}

// 2. Setup Gemini Generation
async function generate1500WordContent(slug, keywords) {
  console.log(`\nGenerating 1500+ word content for: ${slug}`);
  const prompt = `
You are an expert SEO Content Writer and Financial/Technical Subject Matter Expert.
Your task is to write EXACTLY 1500+ words of content for a web calculator tool with the slug: "${slug}".

TARGET KEYWORDS TO INTEGRATE NATURALLY:
${keywords.join(', ')}

CONTENT REQUIREMENTS:
1. Length: MUST be at least 1500 words. Do not summarize. Expand deeply on the mechanics, definitions, real-world applications, and formulas.
2. EEAT formatting: Establish Expertise, Authoritativeness, and Trustworthiness.
3. Structure & Featured Snippet Optimization: 
   - Immediately after the first <h2>, include a concise 40–50 word "Snippet" paragraph starting with "[Tool Name] is calculated by..." to target Google's Position 0.
   - Include a comparison <table> (styled with Tailwind \`border-collapse border border-gray-300 my-6\`) comparing this method vs alternative methods (e.g., Simple vs Compound).
   - Use <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 my-8"> for "Pro-Tips" or "Expert Calculation Examples" to break up the text.
   - Devote a clear section to defining every variable (e.g., P, R, T) and explaining unit conversions (e.g., months to years).
   - Provide at least 3 detailed real-world scenarios/examples (e.g., car loans, savings, business investments).
   - Integrate internal links to other calculators on NepaCalc (e.g., /calculator/compound-interest-calculator/) using <a> tags.
4. Output format: You must output ONLY RAW JSX syntax representing the content, without wrapping it in a markdown code block. Use <h2>, <h3>, <p>, <ul>, <li>, <table>, <tr>, <td>, <th> tags, styled with Tailwind classes. Do NOT use <></> wrappers, I will wrap it. DO NOT USE ANY quotes that aren't escaped or single quotes properly used in JSX.

Then, at the very end of your response, separate the FAQs with a distinct marker: 
---FAQS---
Provide exactly 5 FAQs in strict JSON array format:
[
  {"question": "...", "answer": "..."},
  ...
]
`;

  const apiKey = getNextKey();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
    })
  });

  const data = await response.json();
  if (data.error) {
     console.error("Gemini API Error:", data.error.message);
     return null;
  }
  
  if (!data.candidates || !data.candidates[0]) return null;

  const text = data.candidates[0].content.parts[0].text;
  
  // Parse output
  const parts = text.split('---FAQS---');
  let contentHtml = parts[0].trim();
  let faqsJson = [];
  
  try {
    if (parts[1]) {
       const cleanJson = parts[1].replace(/```json/g, '').replace(/```/g, '').trim();
       faqsJson = JSON.parse(cleanJson);
    }
  } catch(e) {
    console.error("Failed to parse FAQs JSON for", slug);
  }
  
  // Clean up any stray markdown blocks
  contentHtml = contentHtml.replace(/^```jsx?\n/, '').replace(/```$/, '');

  return { content: contentHtml, faqs: faqsJson };
}

// 3. Process File
async function processFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  const regex = /(['"])([a-zA-Z0-9-]+)\1\s*:\s*\{/g;
  let match;
  let keys = [];
  while ((match = regex.exec(text)) !== null) {
      keys.push({ key: match[2], index: match.index });
  }

  console.log(`Found ${keys.length} calculators in ${path.basename(filePath)}`);
  
  for (let i = 0; i < keys.length; i++) {
    const slug = keys[i].key;
    // Skip if already has massive content
    const nextIndex = i < keys.length - 1 ? keys[i+1].index : text.length;
    const block = text.substring(keys[i].index, nextIndex);
    if (block.length > 15000) {
       console.log(`Skipping ${slug}, already looks large enough.`);
       continue;
    }

    const keywords = getKeywordsForSlug(slug);
    const result = await generateWithRetry(slug, keywords);
    
    if (result && result.content && result.faqs.length > 0) {
      const faqsString = JSON.stringify(result.faqs, null, 6).replace(/\}$/gm, '      }');
      let updatedBlock = block;

      // 1. Replace or Add content
      const contentRegex = /content\s*:\s*\([\s\S]*?<\/?>\s*\),?/;
      const newContent = `content: (
      <>
        ${result.content.replace(/\n/g, '\n        ')}
      </>
    ),`;

      if (contentRegex.test(updatedBlock)) {
        updatedBlock = updatedBlock.replace(contentRegex, newContent);
      }

      // 2. Replace or Add faqs
      const faqsRegex = /faqs\s*:\s*\[[\s\S]*?\]/;
      const newFaqs = `faqs: ${faqsString}`;

      if (faqsRegex.test(updatedBlock)) {
        updatedBlock = updatedBlock.replace(faqsRegex, newFaqs);
      } else {
        // If faqs don't exist, insert before the last closing brace
        updatedBlock = updatedBlock.replace(/\s*\}\s*$/, `,\n    ${newFaqs}\n  }`);
      }

      if (updatedBlock !== block) {
         text = text.replace(block, updatedBlock);
         fs.writeFileSync(filePath, text, 'utf8');
         console.log(`Successfully updated and saved ${slug}!`);
      } else {
         console.log(`Failed to update ${slug} - no patterns matched.`);
      }
    }
    
    console.log("Waiting 60s to stay completely safe under rate limits...");
    await new Promise(r => setTimeout(r, 60000));
  }
}

async function run() {
  console.log("Starting batch SEO generation...");
  await processFile(SEO_FILE);
  await processFile(NEPAL_FILE);
  console.log("DONE!");
}

run();
