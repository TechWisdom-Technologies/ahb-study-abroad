const fs = require('fs');
const path = require('path');

const replacements = {
  '#FFD40E': '#5CBAE6', // replace yellow accent with sky blue
  '#ffd40e': '#5CBAE6',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldHex, newHex] of Object.entries(replacements)) {
        const regex = new RegExp(oldHex, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, newHex);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}
processDir('./src');
console.log('Done replacing colors.');
