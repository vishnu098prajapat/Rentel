const fs = require('fs');

const cssPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/Search/SearchResults.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// We will replace the existing filter drawer classes with more premium ones.
const premiumDrawerStyles = `
/* ===== PREMIUM FILTER DRAWER ===== */
.drawerOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9998;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.filterDrawer {
  position: fixed;
  top: 0;
  right: -450px;
  width: 420px;
  max-width: 100%;
  height: 100vh;
  background: #ffffff;
  z-index: 9999;
  box-shadow: -8px 0 30px rgba(0,0,0,0.15);
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
}

.drawerOpen {
  right: 0;
}

.drawerHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px 20px;
  border-bottom: 1px solid #EBEBEB;
}

.drawerHeader h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #222222;
  letter-spacing: -0.5px;
}

.closeDrawerBtn {
  background: #F7F7F7;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #222222;
}

.closeDrawerBtn:hover {
  background: #EBEBEB;
  transform: scale(1.05);
}

.drawerBody {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.filterSection {
  margin-bottom: 40px;
}

.filterSectionTitle {
  font-size: 18px;
  font-weight: 700;
  color: #222222;
  margin: 0 0 20px 0;
}

.drawerFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-top: 1px solid #EBEBEB;
  background: white;
  border-bottom-left-radius: 24px;
}

.clearAllBtn {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  color: #222222;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;
}

.clearAllBtn:hover {
  color: #FF385C;
}

.applyFiltersBtn {
  background: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(227, 28, 95, 0.3);
}

.applyFiltersBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(227, 28, 95, 0.4);
}

.applyFiltersBtn:active {
  transform: translateY(0);
}

/* Modal Pills */
.filterPillGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filterPillBtn {
  background: white;
  border: 1px solid #DDDDDD;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 15px;
  color: #222222;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.filterPillBtn:hover {
  border-color: #222222;
}

.filterPillActive {
  background: #F7F7F7;
  border-color: #222222;
  color: #222222;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px #222222;
}

/* Modal Budget */
.modalBudgetRow {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modalBudgetInputWrapper {
  display: flex;
  align-items: center;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.modalBudgetInputWrapper:focus-within {
  border-color: #222222;
  box-shadow: inset 0 0 0 1px #222222;
}

.rupeePrefix {
  color: #222222;
  font-weight: 600;
  margin-right: 8px;
  font-size: 16px;
}

.modalBudgetInput {
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #222222;
}

.modalBudgetDash {
  color: #717171;
  font-size: 20px;
}
`;

// remove old drawer styles and replace
const startIndex = cssContent.indexOf('/* ===== FILTER DRAWER ===== */');
if (startIndex !== -1) {
  cssContent = cssContent.substring(0, startIndex);
}

cssContent += premiumDrawerStyles;

fs.writeFileSync(cssPath, cssContent);
console.log('Updated to premium drawer CSS.');
