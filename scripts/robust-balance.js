const fs = require('fs');

function balanceFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We will find each block: `content: (` to `),`
    const regex = /content:\s*\([\s\S]*?\n\s*\),/g;
    
    content = content.replace(regex, (block) => {
        // Strip out the start and end
        let innerMatch = block.match(/content:\s*\(\s*([\s\S]*?)\s*\),/);
        if (!innerMatch) return block;
        let inner = innerMatch[1];
        
        // Tokenize inner JSX into tags and text
        let tokens = [];
        let cursor = 0;
        while (cursor < inner.length) {
            let nextOpen = inner.indexOf('<', cursor);
            if (nextOpen === -1) {
                tokens.push({ type: 'text', text: inner.slice(cursor) });
                break;
            }
            if (nextOpen > cursor) {
                tokens.push({ type: 'text', text: inner.slice(cursor, nextOpen) });
            }
            let nextClose = inner.indexOf('>', nextOpen);
            if (nextClose === -1) {
                tokens.push({ type: 'text', text: inner.slice(nextOpen) });
                break;
            }
            let tagStr = inner.slice(nextOpen, nextClose + 1);
            
            // Check if it's a self-closing tag or comment
            if (tagStr.endsWith('/>') || tagStr.startsWith('<!--') || tagStr.startsWith('<?') || tagStr.startsWith('<!')) {
                tokens.push({ type: 'self-closing', text: tagStr });
            } else if (tagStr.startsWith('</')) {
                let tagName = tagStr.match(/<\/([a-zA-Z0-9]+)/)[1];
                tokens.push({ type: 'close', tagName, text: tagStr });
            } else {
                let match = tagStr.match(/<([a-zA-Z0-9]+)/);
                if (match) {
                    tokens.push({ type: 'open', tagName: match[1], text: tagStr });
                } else {
                    tokens.push({ type: 'text', text: tagStr });
                }
            }
            cursor = nextClose + 1;
        }
        
        // Now balance using a stack
        let stack = [];
        let outputTokens = [];
        for (let t of tokens) {
            if (t.type === 'text' || t.type === 'self-closing') {
                outputTokens.push(t.text);
            } else if (t.type === 'open') {
                stack.push(t.tagName);
                outputTokens.push(t.text);
            } else if (t.type === 'close') {
                if (stack.length > 0 && stack[stack.length - 1] === t.tagName) {
                    stack.pop();
                    outputTokens.push(t.text);
                } else if (stack.includes(t.tagName)) {
                    // Implicitly close tags until we find it
                    while (stack.length > 0) {
                        let top = stack.pop();
                        if (top === t.tagName) {
                            outputTokens.push(t.text);
                            break;
                        } else {
                            outputTokens.push(`</${top}>`);
                        }
                    }
                } else {
                    // Unmatched closing tag, ignore it!
                    console.log(`[${filePath}] Removed unmatched closing tag: ${t.text}`);
                }
            }
        }
        
        // Close any remaining open tags
        while (stack.length > 0) {
            let top = stack.pop();
            outputTokens.push(`</${top}>\n`);
            console.log(`[${filePath}] Added missing closing tag: </${top}>`);
        }
        
        return `content: (\n${outputTokens.join('')}\n    ),`;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
}

balanceFile('src/data/seo/algebra.tsx');
balanceFile('src/data/seo/financial.tsx');
balanceFile('src/data/seo/nepal-specific.tsx');
console.log('Robust tag balancing complete.');
