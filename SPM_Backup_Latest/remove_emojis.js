const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2B50}]/gu;

function processFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(emojiRegex, '');
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log("Cleaned:", filePath);
    }
}

walkDir(path.join(__dirname, 'js'), processFile);
walkDir(path.join(__dirname, 'components'), (p) => fs.existsSync(p) && processFile(p));
processFile(path.join(__dirname, 'index.html'));
processFile(path.join(__dirname, 'portal_design_system.html'));
