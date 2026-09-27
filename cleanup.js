const fs = require('fs');
const path = require('path');

const emojisToRemove = ['🔖','🧾','📋','⚖️','✨','🛡️','🏆','🧊','🔬','🔢','🥈','💱','📅','📊','⚙️','🎯','🌟','💡','🔥','⭐','💎','🎪','🏅','🎨','🎭','🎬','🎤','🎵','🎶','🎸','🎹','🎺','🎻','🥇','🥉','🏋','🤸','🏊','🏄','🚀','🌈','🌊','🌺','🌸','🌼','🌻','🌹','🌷','🍀','🍁','🍂','🍃','🍄','🍎','🍊','🍋','🍇','🍓','🍒','🍑','🍌','🍉','🍈','🍏','🍐','🍔','🍕','🍟','🌮','🌯','🥙','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍿','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣','🍤','🍥','🥮','🍡','🥟','🥠','🥡','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🍵','🧃','🥤','🍶','🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃', '✅'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Remove emojis
    emojisToRemove.forEach(emoji => {
        // Need to be careful with string replacements for Unicode
        content = content.split(emoji).join('');
    });

    // 2. Remove HOT/NEW data properties
    content = content.replace(/,\s*isHot:\s*true/g, '');
    content = content.replace(/,\s*isNew:\s*true/g, '');
    content = content.replace(/isHot:\s*true\s*,?/g, '');
    content = content.replace(/isNew:\s*true\s*,?/g, '');
    content = content.replace(/,\s*hot:\s*true/g, '');
    content = content.replace(/,\s*new:\s*true/g, '');
    content = content.replace(/hot:\s*true\s*,?/g, '');
    content = content.replace(/new:\s*true\s*,?/g, '');

    // 3. Remove inline JSX spans for HOT/NEW
    content = content.replace(/\{isNew && <span[^>]+>NEW<\/span>\}/g, '');
    content = content.replace(/\{isHot && <span[^>]+>HOT<\/span>\}/g, '');
    content = content.replace(/\{tool\.hot && <span[^>]+>HOT<\/span>\}/g, '');
    content = content.replace(/\{tool\.isHot && <span[^>]+>HOT<\/span>\}/g, '');
    content = content.replace(/\{calc\.isNew && \([\s\S]*?<span[^>]+>New<\/span>\s*\)\}/g, '');
    content = content.replace(/<span className="nb-tag-new">New<\/span>/g, 'New');

    // 4. Remove empty icons if it happens
    content = content.replace(/icon:\s*''\s*,?/g, '');
    content = content.replace(/icon:\s*""\s*,?/g, '');
    
    // 5. Cleanup SeoSections arrays if icon was removed
    // e.g. { title: '...', desc: '...' } => if it was { icon: '', title: ... } it becomes { title: ... }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
