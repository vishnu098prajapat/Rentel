const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/HostDashboard';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (file.endsWith('.module.css')) {
    // Backgrounds
    content = content.replace(/background(-color)?:\s*#fff(fff)?;/gi, 'background: var(--card-bg, white);');
    content = content.replace(/background(-color)?:\s*white;/gi, 'background: var(--card-bg, white);');
    content = content.replace(/background(-color)?:\s*#F7F7F9;/gi, 'background: var(--bg-secondary);');
    content = content.replace(/background(-color)?:\s*#FAFAFA;/gi, 'background: var(--bg-secondary);');
    
    // Texts
    content = content.replace(/color:\s*#222(222)?;/gi, 'color: var(--text-main);');
    content = content.replace(/color:\s*#000(000)?;/gi, 'color: var(--text-main);');
    content = content.replace(/color:\s*#717171;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#555(555)?;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#333(333)?;/gi, 'color: var(--text-main);');
    
    // Borders
    content = content.replace(/border(-color)?:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0);/gi, 'border: 1px solid var(--border);');
    content = content.replace(/border-bottom:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0);/gi, 'border-bottom: 1px solid var(--border);');
    content = content.replace(/border-top:\s*1px\s*solid\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0);/gi, 'border-top: 1px solid var(--border);');
    content = content.replace(/border(-color)?:\s*#(DDD|EBEBEB|E0E0E0|EEE|F0F0F0);/gi, 'border-color: var(--border);');
    
    // Hover states that might conflict in dark mode
    content = content.replace(/background:\s*#f7f7f7;/gi, 'background: var(--hover-bg, #f7f7f7);');
    content = content.replace(/background:\s*#f0f0f0;/gi, 'background: var(--hover-bg, #f0f0f0);');

    // Fill
    content = content.replace(/fill:\s*#222(222)?;/gi, 'fill: var(--text-main);');
  }

  if (file.endsWith('.jsx')) {
    content = content.replace(/color:\s*'#222'/gi, "color: 'var(--text-main)'");
    content = content.replace(/color:\s*'#000'/gi, "color: 'var(--text-main)'");
    content = content.replace(/color:\s*'#717171'/gi, "color: 'var(--text-secondary)'");
    content = content.replace(/background:\s*'white'/gi, "background: 'var(--card-bg)'");
    content = content.replace(/background:\s*'#fff'/gi, "background: 'var(--card-bg)'");
    content = content.replace(/background:\s*'#F7F7F9'/gi, "background: 'var(--bg-secondary)'");
    content = content.replace(/stroke="\s*#222(222)?\s*"/gi, 'stroke="currentColor"');
    content = content.replace(/fill="\s*#222(222)?\s*"/gi, 'fill="currentColor"');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Processed', file);
  }
});
