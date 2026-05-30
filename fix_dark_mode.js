const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Background colors
  content = content.replace(/background:\s*white;?/gi, 'background: var(--card-bg, white);');
  content = content.replace(/background-color:\s*white;?/gi, 'background-color: var(--card-bg, white);');
  content = content.replace(/background:\s*#fff;?/gi, 'background: var(--card-bg, #fff);');
  content = content.replace(/background-color:\s*#fff;?/gi, 'background-color: var(--card-bg, #fff);');
  content = content.replace(/background:\s*#ffffff;?/gi, 'background: var(--card-bg, #ffffff);');
  
  content = content.replace(/background:\s*#f7f7f7;?/gi, 'background: var(--hover-bg, #f7f7f7);');
  content = content.replace(/background-color:\s*#f7f7f7;?/gi, 'background-color: var(--hover-bg, #f7f7f7);');
  content = content.replace(/background:\s*#f0f0f0;?/gi, 'background: var(--hover-bg, #f0f0f0);');
  
  // Text colors
  content = content.replace(/color:\s*#222;?/gi, 'color: var(--text-main, #222);');
  content = content.replace(/color:\s*#222222;?/gi, 'color: var(--text-main, #222222);');
  content = content.replace(/color:\s*#111;?/gi, 'color: var(--text-main, #111);');
  content = content.replace(/color:\s*#111111;?/gi, 'color: var(--text-main, #111111);');
  content = content.replace(/color:\s*#717171;?/gi, 'color: var(--text-secondary, #717171);');
  content = content.replace(/color:\s*#555;?/gi, 'color: var(--text-secondary, #555);');
  content = content.replace(/color:\s*#555555;?/gi, 'color: var(--text-secondary, #555555);');
  content = content.replace(/color:\s*#888;?/gi, 'color: var(--text-muted, #888);');
  
  // Borders
  content = content.replace(/border(-color)?:\s*(1px|2px|1.5px)\s*solid\s*(#DDD|#DDDDDD|#EBEBEB|#E0E0E0);?/gi, 'border$1: $2 solid var(--border);');
  content = content.replace(/border(-color)?:\s*#222;?/gi, 'border$1: var(--text-main, #222);');
  content = content.replace(/border(-color)?:\s*#222222;?/gi, 'border$1: var(--text-main, #222222);');

  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
});
