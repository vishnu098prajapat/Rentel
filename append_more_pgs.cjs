const fs = require('fs');

const dataPath = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/features/listings/listingsData.js';
let content = fs.readFileSync(dataPath, 'utf8');

// The file ends with "];" and then a newline. We'll replace "];\n" with our new objects, and then "];\n".
const newPGs = `  // ================= MORE PG STAYS (JAIPUR) =================
  { id: 211, title: "Royal Girls PG", type: "pg", rentMode: "pg", pgGender: "Girls", pgType: "Double Sharing", city: "Jaipur", location: "Raja Park, Jaipur", state: "Rajasthan", price: 6500, rating: 4.6, reviews: 32, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"], featured: false, categoryTags: [] },
  { id: 212, title: "Mansarovar Boys Hostel", type: "pg", rentMode: "pg", pgGender: "Boys", pgType: "Triple Sharing", city: "Jaipur", location: "Mansarovar, Jaipur", state: "Rajasthan", price: 3500, rating: 3.8, reviews: 45, badge: "", images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"], featured: false, categoryTags: [] },
  { id: 213, title: "Vaishali Nagar Co-ed PG", type: "pg", rentMode: "pg", pgGender: "Co-ed", pgType: "Single Room", city: "Jaipur", location: "Vaishali Nagar, Jaipur", state: "Rajasthan", price: 12000, rating: 4.9, reviews: 21, badge: "Superhost", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: true, categoryTags: [] },
  { id: 214, title: "Jagatpura Premium Boys PG", type: "pg", rentMode: "pg", pgGender: "Boys", pgType: "Single Room", city: "Jaipur", location: "Jagatpura, Jaipur", state: "Rajasthan", price: 9500, rating: 4.4, reviews: 55, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"], featured: false, categoryTags: [] },
  { id: 215, title: "C-Scheme Girls Residence", type: "pg", rentMode: "pg", pgGender: "Girls", pgType: "Shared-Flat", city: "Jaipur", location: "C-Scheme, Jaipur", state: "Rajasthan", price: 15000, rating: 4.8, reviews: 14, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"], featured: false, categoryTags: [] },
  { id: 216, title: "Pratap Nagar Boys PG", type: "pg", rentMode: "pg", pgGender: "Boys", pgType: "Double Sharing", city: "Jaipur", location: "Pratap Nagar, Jaipur", state: "Rajasthan", price: 5500, rating: 4.1, reviews: 67, badge: "", images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"], featured: false, categoryTags: [] },
  { id: 217, title: "Bapu Nagar Elite Girls PG", type: "pg", rentMode: "pg", pgGender: "Girls", pgType: "Single Room", city: "Jaipur", location: "Bapu Nagar, Jaipur", state: "Rajasthan", price: 11000, rating: 4.7, reviews: 38, badge: "Superhost", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"], featured: true, categoryTags: [] },
  { id: 218, title: "Sodala Co-ed Living", type: "pg", rentMode: "pg", pgGender: "Co-ed", pgType: "Double Sharing", city: "Jaipur", location: "Sodala, Jaipur", state: "Rajasthan", price: 7000, rating: 4.2, reviews: 19, badge: "", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: false, categoryTags: [] },
  { id: 219, title: "Vidhyadhar Nagar Boys PG", type: "pg", rentMode: "pg", pgGender: "Boys", pgType: "Triple Sharing", city: "Jaipur", location: "Vidhyadhar Nagar, Jaipur", state: "Rajasthan", price: 4000, rating: 3.9, reviews: 82, badge: "", images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"], featured: false, categoryTags: [] },
  { id: 220, title: "Malviya Nagar Girls Hostel", type: "pg", rentMode: "pg", pgGender: "Girls", pgType: "Triple Sharing", city: "Jaipur", location: "Malviya Nagar, Jaipur", state: "Rajasthan", price: 5000, rating: 4.3, reviews: 41, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"], featured: false, categoryTags: [] },
  { id: 221, title: "Tonk Phatak Boys PG", type: "pg", rentMode: "pg", pgGender: "Boys", pgType: "Shared-Flat", city: "Jaipur", location: "Tonk Phatak, Jaipur", state: "Rajasthan", price: 8000, rating: 4.5, reviews: 29, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"], featured: false, categoryTags: [] },
  { id: 222, title: "Lalkothi Co-ed PG", type: "pg", rentMode: "pg", pgGender: "Co-ed", pgType: "Shared-Flat", city: "Jaipur", location: "Lalkothi, Jaipur", state: "Rajasthan", price: 10500, rating: 4.6, reviews: 15, badge: "", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: false, categoryTags: [] }
];
`;

content = content.replace('];', ',\n' + newPGs);
fs.writeFileSync(dataPath, content);
console.log('Appended 12 more PGs to Jaipur');
