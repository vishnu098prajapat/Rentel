const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix ;222; typo
  content = content.replace(/;222;/g, ';');
  
  // Replace remaining background: #222
  content = content.replace(/background:\s*#222;/gi, 'background: var(--text-main);');
  
  // Replace remaining box-shadow with #222 and #222222
  content = content.replace(/box-shadow:\s*([^;]*?)#222222;/gi, 'box-shadow: $1var(--text-main);');
  content = content.replace(/box-shadow:\s*([^;]*?)#222;/gi, 'box-shadow: $1var(--text-main);');
  
  // Fix border: 2px solid #222
  content = content.replace(/border:\s*([^;]*?)#222;/gi, 'border: $1var(--text-main);');

  fs.writeFileSync(filePath, content);
  console.log('Fixed #222 issues in', file);
});
