const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/BecomeHost';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove existing MOBILE HEADER NAV & LAYOUT OVERRIDES block
  const blockStart = '/* ===== MOBILE HEADER NAV & LAYOUT OVERRIDES ===== */';
  if (content.includes(blockStart)) {
    content = content.substring(0, content.indexOf(blockStart));
  }

  const appendCSS = `
/* ===== MOBILE HEADER NAV & LAYOUT OVERRIDES ===== */
@media (max-width: 768px) {
  /* Layout fixes to push content up */
  .mainContent, .content, .container {
    justify-content: flex-start !important;
    padding-top: 16px !important;
  }
  
  .title {
    white-space: normal !important;
    text-align: left !important;
    font-size: 22px !important;
    margin-bottom: 12px !important;
  }
  
  .subtitle {
    display: none !important; /* Hide subtext on mobile */
  }
  
  /* Make cards more compact on mobile */
  .counterCard, .amenityCard, .optionCard, .typeCard, .countersCard {
    padding: 12px 16px !important;
    margin-bottom: 8px !important;
  }
  .counterRow {
    padding: 12px 16px !important;
    border-bottom: 1px solid #F0F0F0;
  }
  
  .counterLabel, .amenityLabel, .optionLabel {
    font-size: 14px !important;
  }

  /* Navigation overrides for pages using .sideArrow */
  .sideArrow {
    position: absolute !important;
    top: 14px !important;
    transform: none !important;
    width: auto !important;
    height: 32px !important;
    border-radius: 16px !important;
    padding: 0 16px !important;
    box-shadow: none !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .sideArrow svg {
    width: 16px !important;
    height: 16px !important;
  }
  .leftArrow {
    left: auto !important;
    right: 90px !important;
    background: transparent !important;
    border: 1px solid #DDD !important;
  }
  .leftArrow::after {
    content: "Back";
    font-size: 13px;
    font-weight: 600;
    margin-left: 4px;
    color: #222;
  }
  .rightArrow {
    right: 16px !important;
    background: #222 !important;
    border: 1px solid #222 !important;
    color: white !important;
  }
  .rightArrow::before {
    content: "Next";
    font-size: 13px;
    font-weight: 600;
    margin-right: 4px;
    color: white !important;
  }
  .rightArrow svg {
    color: white !important;
  }
  .sideArrow:hover {
    transform: none !important;
  }

  /* Fix for Next button in pages using .navBtnNext (like BecomeHostDetails) */
  .navBtnNext {
    background: #222 !important;
    color: white !important;
    border-color: #222 !important;
  }
  .navBtnNext span {
    color: white !important;
  }
  .navBtnNext svg {
    color: white !important;
  }
}
`;
  
  content += appendCSS;
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
