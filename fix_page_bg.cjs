const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace hardcoded page backgrounds
  content = content.replace(/background:\s*#F7F7F9;?/gi, 'background: var(--bg-secondary);');
  content = content.replace(/background:\s*#fcfcfc;?/gi, 'background: var(--bg-secondary);');
  content = content.replace(/background-color:\s*#F7F7F9;?/gi, 'background-color: var(--bg-secondary);');

  // Replace hardcoded header borders
  content = content.replace(/border-bottom:\s*1px\s*solid\s*#EBEBEB;?/gi, 'border-bottom: 1px solid var(--border);');

  // In BecomeHostLocation.module.css, make sure map inverts reliably
  if (file === 'BecomeHostLocation.module.css') {
    // Add broad map filter for react-leaflet
    if (!content.includes('.leaflet-tile {')) {
      content += '\n\n:global([data-theme="dark"]) .leaflet-layer, :global([data-theme="dark"]) .leaflet-tile, :global([data-theme="dark"]) .leaflet-container {\n  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);\n}\n';
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed page background and borders in', file);
});
