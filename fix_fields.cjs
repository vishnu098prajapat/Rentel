const fs = require('fs');
const path = require('path');

// 1. Fix BecomeHostTitleDesc.jsx (highlights inline colors)
const titleDescJsxPath = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost/BecomeHostTitleDesc.jsx';
let titleDescJsx = fs.readFileSync(titleDescJsxPath, 'utf8');
titleDescJsx = titleDescJsx.replace(/color:\s*isSelected\s*\?\s*hl\.color\s*:\s*'#717171'/g, "color: isSelected ? hl.color : 'var(--text-secondary)'");
titleDescJsx = titleDescJsx.replace(/color:\s*isSelected\s*\?\s*hl\.color\s*:\s*'#222'/g, "color: isSelected ? hl.color : 'var(--text-main)'");
fs.writeFileSync(titleDescJsxPath, titleDescJsx);

// 2. Fix BecomeHostTitleDesc.module.css (textarea backgrounds)
const titleDescCssPath = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost/BecomeHostTitleDesc.module.css';
let titleDescCss = fs.readFileSync(titleDescCssPath, 'utf8');
titleDescCss = titleDescCss.replace(/background:\s*var\(--card-bg,\s*white\);/g, 'background: var(--bg-main);');
// Add slightly more visible border to inputs globally for dark mode
titleDescCss = titleDescCss.replace(/border:\s*1px\s*solid\s*var\(--border\);/g, 'border: 1px solid var(--border); box-shadow: 0 0 0 1px var(--border-light);');
fs.writeFileSync(titleDescCssPath, titleDescCss);

// 3. Fix BecomeHostFinalDetails.module.css (input borders and select arrow)
const finalDetailsCssPath = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost/BecomeHostFinalDetails.module.css';
let finalDetailsCss = fs.readFileSync(finalDetailsCssPath, 'utf8');
finalDetailsCss = finalDetailsCss.replace(/border:\s*2px\s*solid\s*transparent;/g, 'border: 1px solid var(--border); box-shadow: 0 0 0 1px var(--border-light);');
finalDetailsCss = finalDetailsCss.replace(/background:\s*var\(--bg-secondary\);/g, 'background: var(--bg-main);');
finalDetailsCss = finalDetailsCss.replace(/stroke='%23222'/g, "stroke='%23888'");
fs.writeFileSync(finalDetailsCssPath, finalDetailsCss);

console.log('Fixed highlight colors and input borders');
