require('dotenv').config({ path: '.env.local' });
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

async function list() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
list();
