const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the semicolon !important typo
  content = content.replace(/;\s*!important;/g, ' !important;');

  fs.writeFileSync(filePath, content);
  console.log('Fixed semicolons in', file);
});
