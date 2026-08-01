const fs = require('fs');
const path = require('path');

const replacements = {
  '/assets/ahb-logo.jpg': '/assets/ahb-logo.png',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldLogo, newLogo] of Object.entries(replacements)) {
        if (content.includes(oldLogo)) {
          content = content.split(oldLogo).join(newLogo);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated logo in', fullPath);
      }
    }
  }
}
processDir('./src');
console.log('Done replacing logos.');
