const fs = require('fs');

const cssPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/Search/SearchResults.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  /\.filterPillActive\s*\{[^}]+\}/,
  `.filterPillActive {
  background: #FF385C;
  border-color: #FF385C;
  color: #FFFFFF;
  font-weight: 600;
}`
);

fs.writeFileSync(cssPath, cssContent);
console.log('Fixed CSS for filterPillActive');
