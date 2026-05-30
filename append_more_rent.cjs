const fs = require('fs');
const path = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/features/listings/listingsData.js';

let data = fs.readFileSync(path, 'utf8');

const newRentData = `
  // ================= EVEN MORE RENT STAYS (JAIPUR) =================
  { id: 121, title: "Premium Car Showroom Space", type: "commercial", propertyType: "Showroom", rentMode: "rent", city: "Jaipur", location: "Tonk Road, Jaipur", state: "Rajasthan", price: 250000, rating: 4.8, reviews: 10, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800"], featured: true, categoryTags: [] },
  { id: 122, title: "Fertile Agricultural Land", type: "land", propertyType: "Agricultural Land", rentMode: "rent", city: "Jaipur", location: "Sanganer Highway, Jaipur", state: "Rajasthan", price: 12000, rating: 4.1, reviews: 5, badge: "", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"], featured: false, categoryTags: [] },
  { id: 123, title: "Luxury Farm House For Rent", type: "farmhouse", propertyType: "Farm House", rentMode: "rent", city: "Jaipur", location: "Kukas, Jaipur", state: "Rajasthan", price: 85000, rating: 4.9, reviews: 33, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800"], featured: true, categoryTags: ["With Pool"] },
  { id: 124, title: "Cozy 1 BHK in C-Scheme", type: "flat", propertyType: "1 BHK", rentMode: "rent", city: "Jaipur", location: "C-Scheme, Jaipur", state: "Rajasthan", price: 18000, rating: 4.6, reviews: 24, badge: "", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], featured: false, categoryTags: [] },
  { id: 125, title: "Modern 3 BHK Family Apartment", type: "flat", propertyType: "3 BHK", rentMode: "rent", city: "Jaipur", location: "Vaishali Nagar, Jaipur", state: "Rajasthan", price: 40000, rating: 4.7, reviews: 45, badge: "Superhost", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: true, categoryTags: [] },
  { id: 126, title: "Independent House/Villa", type: "villa", propertyType: "House/Villa", rentMode: "rent", city: "Jaipur", location: "Jagatpura, Jaipur", state: "Rajasthan", price: 60000, rating: 4.8, reviews: 15, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"], featured: false, categoryTags: [] },
  { id: 127, title: "IT Corporate Office", type: "commercial", propertyType: "Office", rentMode: "rent", city: "Jaipur", location: "Sitapura Industrial Area, Jaipur", state: "Rajasthan", price: 150000, rating: 4.4, reviews: 18, badge: "", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"], featured: false, categoryTags: [] },
  { id: 128, title: "Main Bazaar Shop", type: "commercial", propertyType: "Shop", rentMode: "rent", city: "Jaipur", location: "MI Road, Jaipur", state: "Rajasthan", price: 75000, rating: 4.9, reviews: 62, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1582055610731-893fa141eab1?w=800"], featured: true, categoryTags: [] },
  { id: 129, title: "Luxurious 4+ BHK Bungalow", type: "flat", propertyType: "4+ BHK", rentMode: "rent", city: "Jaipur", location: "Civil Lines, Jaipur", state: "Rajasthan", price: 140000, rating: 5.0, reviews: 9, badge: "Superhost", images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"], featured: true, categoryTags: ["Luxury"] },
  { id: 130, title: "Boutique Showroom Space", type: "commercial", propertyType: "Showroom", rentMode: "rent", city: "Jaipur", location: "Raja Park, Jaipur", state: "Rajasthan", price: 180000, rating: 4.5, reviews: 14, badge: "", images: ["https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800"], featured: false, categoryTags: [] },
  { id: 131, title: "Farm Land for Lease", type: "land", propertyType: "Agricultural Land", rentMode: "rent", city: "Jaipur", location: "Ajmer Road, Jaipur", state: "Rajasthan", price: 18000, rating: 4.2, reviews: 4, badge: "", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"], featured: false, categoryTags: [] },
  { id: 132, title: "Weekend Farm House", type: "farmhouse", propertyType: "Farm House", rentMode: "rent", city: "Jaipur", location: "Delhi Road, Jaipur", state: "Rajasthan", price: 95000, rating: 4.7, reviews: 26, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800"], featured: false, categoryTags: ["With Pool"] },
  { id: 133, title: "Fully Furnished Flat", type: "flat", propertyType: "Flat", rentMode: "rent", city: "Jaipur", location: "Mansarovar, Jaipur", state: "Rajasthan", price: 21000, rating: 4.3, reviews: 88, badge: "", images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"], featured: false, categoryTags: [] },
  { id: 134, title: "Premium 2 BHK Near Mall", type: "flat", propertyType: "2 BHK", rentMode: "rent", city: "Jaipur", location: "Malviya Nagar, Jaipur", state: "Rajasthan", price: 28000, rating: 4.6, reviews: 31, badge: "Superhost", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: false, categoryTags: [] },
  { id: 135, title: "Startup Office Space", type: "commercial", propertyType: "Office", rentMode: "rent", city: "Jaipur", location: "JLN Marg, Jaipur", state: "Rajasthan", price: 45000, rating: 4.5, reviews: 41, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"], featured: true, categoryTags: [] }
`;

// Insert before the last closing bracket
const lastBracketIndex = data.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  data = data.substring(0, lastBracketIndex) + ',' + newRentData + '\\n];';
  fs.writeFileSync(path, data);
  console.log('Added 15 more specific rent properties for Jaipur');
} else {
  console.log('Could not find closing bracket in listingsData.js');
}
