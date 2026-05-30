const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Safely replace background: #000; which is used for navBtnNext hover
  content = content.replace(/background:\s*#000;/gi, 'opacity: 0.85; background: var(--text-main); color: var(--bg-main);');
  
  // Replace remaining white-ish gradients to var(--card-bg)
  content = content.replace(/background:\s*linear-gradient\([^)]+#ffffff,\s*#fcfcfc\);/gi, 'background: var(--card-bg);');
  content = content.replace(/background:\s*linear-gradient\([^)]+#FFF5F7\s*0%,\s*(?:#FFFFFF|#FFF)\s*100%\);/gi, 'background: var(--card-bg);');
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed hover and gradient in', file);
});
