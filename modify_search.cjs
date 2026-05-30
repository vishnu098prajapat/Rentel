const fs = require('fs');
const path = require('path');

const jsxPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/components/HeroSection/SearchSection.jsx';
const cssPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/components/HeroSection/SearchSection.module.css';

let jsxContent = fs.readFileSync(jsxPath, 'utf8');

// 1. Add states
jsxContent = jsxContent.replace(
  `  const [activePopup, setActivePopup] = useState(null); // 'location' | 'dates' | 'guests' | null\n  const [location, setLocation] = useState('');`,
  `  const [activePopup, setActivePopup] = useState(null); // 'location' | 'dates' | 'guests' | 'property' | 'budget' | null\n  const [location, setLocation] = useState('');\n  const [searchMode, setSearchMode] = useState('holiday');\n  const [propertyType, setPropertyType] = useState('Any');\n  const [budget, setBudget] = useState('Any');`
);

// 2. Add Building to lucide imports
jsxContent = jsxContent.replace(
  `import { MapPin, Calendar, Users, Search, Navigation, Building, Trees, Palmtree, Mountain, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';`,
  `import { MapPin, Calendar, Users, Search, Navigation, Building, Trees, Palmtree, Mountain, Plus, Minus, ChevronLeft, ChevronRight, Home, IndianRupee } from 'lucide-react';`
);

// 3. Update handleSearch
const oldHandleSearch = `const handleSearch = (e) => {
    e.stopPropagation();
    const guestCount = adults + children;
    
    dispatch(updateFilters({ city: location, propertyType: 'all' }));
    dispatch(filterBySearch({ city: location, propertyType: 'all' }));
    setActivePopup(null);

    // Redirect to the new premium Search Results split screen!
    navigate(\`/search?city=\${encodeURIComponent(location)}&checkIn=\${encodeURIComponent(checkIn || '')}&checkOut=\${encodeURIComponent(checkOut || '')}&guests=\${guestCount}\`);
  };`;

const newHandleSearch = `const handleSearch = (e) => {
    e.stopPropagation();
    const guestCount = adults + children;
    
    dispatch(updateFilters({ city: location, propertyType: searchMode === 'longterm' ? propertyType : 'all' }));
    dispatch(filterBySearch({ city: location, propertyType: searchMode === 'longterm' ? propertyType : 'all' }));
    setActivePopup(null);

    if (searchMode === 'longterm') {
      navigate(\`/search?city=\${encodeURIComponent(location)}&type=\${encodeURIComponent(propertyType)}&budget=\${encodeURIComponent(budget)}\`);
    } else {
      navigate(\`/search?city=\${encodeURIComponent(location)}&checkIn=\${encodeURIComponent(checkIn || '')}&checkOut=\${encodeURIComponent(checkOut || '')}&guests=\${guestCount}\`);
    }
  };`;

jsxContent = jsxContent.replace(oldHandleSearch, newHandleSearch);

// 4. Tab Switcher
jsxContent = jsxContent.replace(
  `<div className={styles.searchWrapper} ref={searchRef}>\n      <div className={styles.searchCard}>`,
  `<div className={styles.searchWrapper} ref={searchRef}>
      <div className={styles.searchTabs}>
        <button 
          className={\`\${styles.tabBtn} \${searchMode === 'holiday' ? styles.tabActive : ''}\`}
          onClick={() => { setSearchMode('holiday'); setActivePopup(null); }}
        >
          Holiday Stays
        </button>
        <button 
          className={\`\${styles.tabBtn} \${searchMode === 'longterm' ? styles.tabActive : ''}\`}
          onClick={() => { setSearchMode('longterm'); setActivePopup(null); }}
        >
          Long Term (PG/Flats)
        </button>
      </div>
      <div className={styles.searchCard}>`
);

// 5. When / Property Type Split
jsxContent = jsxContent.replace(
  `<div className={styles.searchDivider}></div>

        {/* WHEN PANEL */}
        <div 
          className={\`\${styles.searchSection} \${activePopup === 'dates' ? styles.sectionActive : ''}\`}
          onClick={() => setActivePopup('dates')}`,
  `<div className={styles.searchDivider}></div>

        {/* DYNAMIC MIDDLE PANEL */}
        {searchMode === 'holiday' ? (
        <div 
          className={\`\${styles.searchSection} \${activePopup === 'dates' ? styles.sectionActive : ''}\`}
          onClick={() => setActivePopup('dates')}`
);

jsxContent = jsxContent.replace(
  `              </div>
            </div>
          )}
        </div>

        <div className={styles.searchDivider}></div>

        {/* WHO PANEL */}
        <div 
          className={\`\${styles.searchSection} \${activePopup === 'guests' ? styles.sectionActive : ''}\`}
          onClick={() => setActivePopup('guests')}`,
  `              </div>
            </div>
          )}
        </div>
        ) : (
          <div 
            className={\`\${styles.searchSection} \${activePopup === 'property' ? styles.sectionActive : ''}\`}
            onClick={() => setActivePopup('property')}
          >
            <Home className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>Property</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: propertyType !== 'Any' ? '600' : '400' }}>
                {propertyType}
              </span>
            </div>
            {activePopup === 'property' && (
              <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.simpleList}>
                  {['Any', 'Flat', 'PG', 'Villa', 'Independent House'].map(pt => (
                    <div key={pt} className={styles.simpleListItem} onClick={() => { setPropertyType(pt); setActivePopup(null); }}>
                      <span className={propertyType === pt ? styles.selectedItemText : ''}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.searchDivider}></div>

        {/* DYNAMIC RIGHT PANEL */}
        {searchMode === 'holiday' ? (
        <div 
          className={\`\${styles.searchSection} \${activePopup === 'guests' ? styles.sectionActive : ''}\`}
          onClick={() => setActivePopup('guests')}`
);

// 6. Who / Budget Split
jsxContent = jsxContent.replace(
  `                </div>
              </div>
            </div>
          )}
        </div>

        <button className={styles.searchBtn} onClick={handleSearch}>`,
  `                </div>
              </div>
            </div>
          )}
        </div>
        ) : (
          <div 
            className={\`\${styles.searchSection} \${activePopup === 'budget' ? styles.sectionActive : ''}\`}
            onClick={() => setActivePopup('budget')}
          >
            <IndianRupee className={styles.searchIcon} />
            <div className={styles.searchTextBlock}>
              <label className={styles.searchLabel}>Budget</label>
              <span className={styles.searchPlaceholder} style={{ fontWeight: budget !== 'Any' ? '600' : '400' }}>
                {budget}
              </span>
            </div>
            {activePopup === 'budget' && (
              <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.simpleList}>
                  {['Any', 'Up to ₹10,000', '₹10k - ₹30k', '₹30k - ₹50k', '₹50k+'].map(b => (
                    <div key={b} className={styles.simpleListItem} onClick={() => { setBudget(b); setActivePopup(null); }}>
                      <span className={budget === b ? styles.selectedItemText : ''}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button className={styles.searchBtn} onClick={handleSearch}>`
);

fs.writeFileSync(jsxPath, jsxContent);
console.log('Updated JSX successfully.');

// --- CSS UPDATES ---
let cssContent = fs.readFileSync(cssPath, 'utf8');

const cssAppends = `
/* ===== HYBRID SEARCH BAR TABS ===== */
.searchTabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.tabBtn {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #EBEBEB;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 20px;
}

.tabBtn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.tabActive {
  color: white;
  font-weight: 700;
}

.tabActive::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
}

/* ===== SIMPLE DROPDOWN LIST ===== */
.simpleList {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  min-width: 200px;
}

.simpleListItem {
  padding: 12px 20px;
  cursor: pointer;
  font-size: 15px;
  color: #222;
  transition: background 0.2s;
}

.simpleListItem:hover {
  background: #F7F7F7;
}

.selectedItemText {
  font-weight: 700;
  color: #FF385C;
}

@media (max-width: 768px) {
  .searchTabs {
    gap: 8px;
    margin-bottom: 16px;
  }
  .tabBtn {
    font-size: 14px;
    padding: 6px 12px;
  }
}
`;

if (!cssContent.includes('.searchTabs')) {
  cssContent += cssAppends;
  fs.writeFileSync(cssPath, cssContent);
  console.log('Updated CSS successfully.');
}
