const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix navBtnNext text color
  // In dark mode, text-main is white. So background is white. Color should be black (bg-main).
  content = content.replace(/\.navBtnNext\s*\{\s*background:\s*var\(--text-main\);\s*color:\s*white;/g, '.navBtnNext { background: var(--text-main); color: var(--bg-main);');

  // Fix expandedDetailsForm gradient background which is hardcoded to white/light gray
  content = content.replace(/background:\s*linear-gradient\([^)]+#ffffff,\s*#f9f9f9\);/gi, 'background: var(--card-bg);');
  
  // Fix any other stray linear gradients with white
  content = content.replace(/background:\s*linear-gradient\([^)]+#fff,\s*#f9f9f9\);/gi, 'background: var(--card-bg);');

  // Add map filter for dark mode if it's the location page
  if (file === 'BecomeHostLocation.module.css') {
    if (!content.includes('filter: invert')) {
      content += '\n\n:global([data-theme="dark"]) .mapContainer iframe, :global([data-theme="dark"]) .leaflet-layer {\n  filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);\n}\n';
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed additional dark mode issues in', file);
});
