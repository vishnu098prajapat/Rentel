const fs = require('fs');

const cssPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/components/HeroSection/SearchSection.module.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const additionalStyles = `
/* ===== NEW ADVANCED POPUP STYLES ===== */
.largePopup {
  width: 440px !important;
}

@media (max-width: 600px) {
  .largePopup {
    width: 320px !important;
  }
}

.categoryBlock {
  margin-bottom: 24px;
}

.categoryBlock:last-child {
  margin-bottom: 0;
}

.categoryTitle {
  font-size: 13px;
  font-weight: 700;
  color: #111111;
  margin: 0 0 12px 0;
}

.pillGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pillBtn {
  background: white;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #222222;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pillBtn:hover {
  border-color: #222222;
}

.pillActive {
  background: #FFECEE;
  border-color: #FF385C;
  color: #FF385C;
  font-weight: 700;
}

.customBudgetRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.budgetInputWrapper {
  display: flex;
  align-items: center;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  padding: 8px 12px;
  flex: 1;
  background: white;
  transition: border-color 0.2s;
}

.budgetInputWrapper:focus-within {
  border-color: #222222;
}

.rupeePrefix {
  color: #717171;
  font-weight: 600;
  font-size: 14px;
  margin-right: 6px;
}

.budgetInput {
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  width: 100%;
}

.budgetInput::placeholder {
  color: #AAAAAA;
}

.budgetDash {
  color: #717171;
  font-weight: 600;
}

.applyBudgetBtn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #222222;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.applyBudgetBtn:hover {
  background: #000000;
}
`;

if (!cssContent.includes('.pillGroup')) {
  fs.appendFileSync(cssPath, additionalStyles);
  console.log('Appended CSS successfully.');
} else {
  console.log('CSS already contains the classes.');
}
