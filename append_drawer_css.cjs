const fs = require('fs');

const cssPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/pages/Search/SearchResults.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalStyles = `
/* ===== PREMIUM EMPTY STATE ===== */
.premiumEmptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-top: 40px;
}

.emptyIconWrapper {
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.emptyIcon {
  color: #FF385C;
}

.emptyTitle {
  font-size: 24px;
  font-weight: 700;
  color: #222222;
  margin: 0 0 12px 0;
}

.emptySubtitle {
  font-size: 16px;
  color: #717171;
  margin: 0 0 32px 0;
  max-width: 400px;
}

.emptyActions {
  display: flex;
  gap: 16px;
}

.clearFiltersBtn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background: white;
  border: 1px solid #222222;
  color: #222222;
  cursor: pointer;
  transition: all 0.2s;
}

.clearFiltersBtn:hover {
  background: #f8f9fa;
}

.changeFiltersBtn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background: #222222;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.changeFiltersBtn:hover {
  background: #000000;
}


/* ===== FILTER DRAWER ===== */
.drawerOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
  backdrop-filter: blur(2px);
}

.filterDrawer {
  position: fixed;
  top: 0;
  right: -450px;
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 9999;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.drawerOpen {
  right: 0;
}

.drawerHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #EBEBEB;
}

.drawerHeader h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #222222;
}

.closeDrawerBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.2s;
}

.closeDrawerBtn:hover {
  background: #F7F7F7;
}

.drawerBody {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.filterSection {
  margin-bottom: 32px;
}

.filterSectionTitle {
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin: 0 0 16px 0;
}

.drawerFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #EBEBEB;
  background: white;
}

.clearAllBtn {
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  color: #222222;
  cursor: pointer;
}

.applyFiltersBtn {
  background: #222222;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.applyFiltersBtn:hover {
  background: #000000;
}

/* Reusing Pill Styles for Modal */
.filterPillGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filterPillBtn {
  background: white;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #222222;
  cursor: pointer;
  transition: all 0.2s;
}

.filterPillActive {
  background: #FFECEE;
  border-color: #FF385C;
  color: #FF385C;
  font-weight: 600;
}

.modalBudgetRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modalBudgetInputWrapper {
  display: flex;
  align-items: center;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  padding: 10px 12px;
  flex: 1;
}

.modalBudgetInput {
  border: none;
  outline: none;
  width: 100%;
  font-size: 15px;
}

.modalBudgetDash {
  color: #717171;
}
`;

if (!cssContent.includes('.premiumEmptyState')) {
  fs.appendFileSync(cssPath, additionalStyles);
  console.log('Appended CSS successfully.');
} else {
  console.log('CSS already contains the classes.');
}
