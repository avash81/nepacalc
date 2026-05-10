const fs = require('fs');

const filePath = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo/nepal-specific.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix common unclosed parentheses in text nodes
// This regex looks for ( followed by text and then a newline or a tag, and ensures it's closed.
// But it's easier to just do specific replacements for known broken strings.

const replacements = [
    { from: '(SEE ', to: '(SEE) ' },
    { from: '(NEB ', to: '(NEB) ' },
    { from: '(NG ', to: '(NG) ' },
    { from: '(CDC ', to: '(CDC) ' },
    { from: '(SSF ', to: '(SSF) ' },
    { from: '(FEB ', to: '(FEB) ' },
    { from: '(DOFE ', to: '(DOFE) ' },
    { from: '(B.S. ', to: '(B.S.) ' },
    { from: '(A.D. ', to: '(A.D.) ' },
    { from: '(PSC ', to: '(PSC) ' },
    { from: '(IRD ', to: '(IRD) ' },
    { from: '(TMS ', to: '(TMS) ' },
    { from: '(WACC ', to: '(WACC) ' },
    { from: '(CGT ', to: '(CGT) ' },
    { from: '(SEBON ', to: '(SEBON) ' },
    { from: '(TU ', to: '(TU) ' },
    { from: '(KU ', to: '(KU) ' },
    { from: '(POU ', to: '(POU) ' },
    { from: '(UGC ', to: '(UGC) ' },
    { from: '(VAT ', to: '(VAT) ' },
    { from: '(FAR ', to: '(FAR) ' },
    { from: '(sq.ft ', to: '(sq.ft) ' },
    { from: '(sq.m ', to: '(sq.m) ' },
    { from: '(B.S. ', to: '(B.S.) ' },
    { from: '(May 2026 .', to: '(May 2026).' },
    { from: '(Normal Fee Deadline (Baisakh 20 ', to: '(Normal Fee Deadline (Baisakh 20)) ' },
    { from: '(34y 11m (Under 35 ', to: '(34y 11m (Under 35)) ' },
    { from: '(66% ', to: '(66%) ' },
    { from: '(35% theory / 40% practical threshold rules.', to: '(35% theory / 40% practical threshold rules).' },
];

replacements.forEach(r => {
    content = content.split(r.from).join(r.to);
});

// Fix the broken structural part I just caused
const brokenPart = `<div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        answer: "NG stands for 'Non-Graded'`;

const fixedPart = `<div className="pt-10 border-t border-slate-200 text-center mt-12">
        <p className="text-[11px] text-slate-400 italic bg-slate-50 inline-block px-6 py-2 rounded-full border border-slate-100">
        Compliance Audit: Last updated Baishakh 2083 (May 2026). Calculations strictly follow the National Examination Board (NEB) Letter Grading Directive 2078.
        </p>
        </div>
        </div>
        </div>
    ),
    faqs: [
      { 
        question: "What exactly is 'NG' in the SEE result?", 
        answer: "NG stands for 'Non-Graded'`;

content = content.replace(brokenPart, fixedPart);

// Fix double closing tags
content = content.replace(/<\/li>\s*<\/li>/g, '</li>');
content = content.replace(/<\/li>\s*<li>/g, '</li><li>');

// Ensure all section, div, ul are balanced in content blocks
// This is harder via regex, so we'll do a simple check.
// Actually, the manual fixes above should cover most.

fs.writeFileSync(filePath, content);
console.log("Sanitized nepal-specific.tsx");
