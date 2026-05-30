const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/UserProfile';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (file.endsWith('.module.css')) {
    // Layout and Premium touches
    content = content.replace(/max-width:\s*1080px;/gi, 'max-width: 1300px;'); // Full width with proper spacing
    content = content.replace(/box-shadow:\s*0\s*4px\s*20px\s*rgba\(0,\s*0,\s*0,\s*0\.04\);/gi, 'box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.02);');

    // Backgrounds
    content = content.replace(/background(-color)?:\s*#fff(fff)?;/gi, 'background: var(--card-bg, white);');
    content = content.replace(/background(-color)?:\s*white;/gi, 'background: var(--card-bg, white);');
    content = content.replace(/background(-color)?:\s*#F7F7F7;/gi, 'background: var(--bg-main);'); // page background
    content = content.replace(/background(-color)?:\s*#F9F9F9;/gi, 'background: var(--bg-secondary);'); // info boxes
    content = content.replace(/background(-color)?:\s*#FFF0F2;/gi, 'background: rgba(255, 56, 92, 0.1);'); // active nav item

    // Texts
    content = content.replace(/color:\s*#222(222)?;/gi, 'color: var(--text-main);');
    content = content.replace(/color:\s*#000(000)?;/gi, 'color: var(--text-main);');
    content = content.replace(/color:\s*#717171;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#444(444)?;/gi, 'color: var(--text-secondary);');
    
    // Borders
    content = content.replace(/border(-color)?:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0|DDDDDD);/gi, 'border: 1px solid var(--border);');
    content = content.replace(/border-bottom:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0|DDDDDD);/gi, 'border-bottom: 1px solid var(--border);');
    content = content.replace(/border-top:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0|DDDDDD);/gi, 'border-top: 1px solid var(--border);');
    content = content.replace(/border(-color)?:\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0|DDDDDD);/gi, 'border-color: var(--border);');
    
    // Buttons & specific fixes
    content = content.replace(/\.btnPrimary\s*{\s*padding:[^}]*background:\s*#222/gi, (match) => match.replace('#222', 'var(--text-main)'));
    content = content.replace(/\.btnPrimary\s*{\s*[^}]*color:\s*white/gi, (match) => match.replace('white', 'var(--bg-main)'));
    content = content.replace(/\.btnPrimary:hover\s*{\s*background:\s*#000;/gi, '.btnPrimary:hover {\n  background: var(--text-main);\n  opacity: 0.85;');
  }

  if (file.endsWith('.jsx')) {
    content = content.replace(/color:\s*'#222'/gi, "color: 'var(--text-main)'");
    content = content.replace(/color:\s*'#000'/gi, "color: 'var(--text-main)'");
    content = content.replace(/color:\s*'#717171'/gi, "color: 'var(--text-secondary)'");
    content = content.replace(/background:\s*'white'/gi, "background: 'var(--card-bg)'");
    content = content.replace(/background:\s*'#fff'/gi, "background: 'var(--card-bg)'");
    content = content.replace(/background:\s*'#F7F7F7'/gi, "background: 'var(--bg-main)'");
    content = content.replace(/stroke="\s*#222(222)?\s*"/gi, 'stroke="currentColor"');
    content = content.replace(/fill="\s*#222(222)?\s*"/gi, 'fill="currentColor"');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Processed', file);
  }
});
