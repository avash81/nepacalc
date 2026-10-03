const fs = require('fs');
let content = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf-8');

const oldLoader = "      <div className=\"flex-1 flex flex-col lg:flex-row gap-6 p-6 min-h-screen items-center justify-center bg-[#f8fafc]\">\r\n        <div className=\"animate-pulse flex flex-col items-center gap-4\">";
const newLoader = "      <div className=\"flex flex-col min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full items-center justify-center bg-[#f8fafc]\">\r\n        <div className=\"flex flex-col items-center gap-4\">";

content = content.replace(oldLoader, newLoader);
fs.writeFileSync('src/app/engineering/3d/page.tsx', content);
console.log('Loading skeleton updated');
