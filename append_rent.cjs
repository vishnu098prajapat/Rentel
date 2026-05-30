const fs = require('fs');
const path = 'c:/Users/rampr/OneDrive/Desktop/Rentel/src/features/listings/listingsData.js';

let data = fs.readFileSync(path, 'utf8');

const newRentData = `
  // ================= MORE RENT STAYS (JAIPUR) =================
  { id: 111, title: "Modern 2 BHK Apartment", type: "flat", propertyType: "2 BHK", rentMode: "rent", city: "Jaipur", location: "C-Scheme, Jaipur", state: "Rajasthan", price: 25000, rating: 4.7, reviews: 42, badge: "Superhost", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: true, categoryTags: [] },
  { id: 112, title: "Spacious Independent Villa", type: "villa", propertyType: "House/Villa", rentMode: "rent", city: "Jaipur", location: "Vaishali Nagar, Jaipur", state: "Rajasthan", price: 55000, rating: 4.9, reviews: 18, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"], featured: false, categoryTags: [] },
  { id: 113, title: "Cozy 1 BHK for Singles", type: "flat", propertyType: "1 BHK", rentMode: "rent", city: "Jaipur", location: "Malviya Nagar, Jaipur", state: "Rajasthan", price: 15000, rating: 4.5, reviews: 67, badge: "", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"], featured: false, categoryTags: [] },
  { id: 114, title: "Premium 3 BHK Family Flat", type: "flat", propertyType: "3 BHK", rentMode: "rent", city: "Jaipur", location: "Raja Park, Jaipur", state: "Rajasthan", price: 38000, rating: 4.8, reviews: 29, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"], featured: true, categoryTags: [] },
  { id: 115, title: "Prime Commercial Office Space", type: "commercial", propertyType: "Office", rentMode: "rent", city: "Jaipur", location: "Tonk Road, Jaipur", state: "Rajasthan", price: 85000, rating: 4.2, reviews: 12, badge: "", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"], featured: false, categoryTags: [] },
  { id: 116, title: "Main Road Retail Shop", type: "commercial", propertyType: "Shop", rentMode: "rent", city: "Jaipur", location: "Bapu Nagar, Jaipur", state: "Rajasthan", price: 45000, rating: 4.6, reviews: 8, badge: "Superhost", images: ["https://images.unsplash.com/photo-1582055610731-893fa141eab1?w=800"], featured: false, categoryTags: [] },
  { id: 117, title: "Luxury 4+ BHK Penthouse", type: "flat", propertyType: "4+ BHK", rentMode: "rent", city: "Jaipur", location: "Civil Lines, Jaipur", state: "Rajasthan", price: 120000, rating: 5.0, reviews: 15, badge: "Guest favourite", images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"], featured: true, categoryTags: ["Luxury"] },
  { id: 118, title: "Furnished Flat Near Metro", type: "flat", propertyType: "Flat", rentMode: "rent", city: "Jaipur", location: "Mansarovar, Jaipur", state: "Rajasthan", price: 22000, rating: 4.4, reviews: 51, badge: "", images: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"], featured: false, categoryTags: [] },
  { id: 119, title: "Semi-Furnished 2 BHK", type: "flat", propertyType: "2 BHK", rentMode: "rent", city: "Jaipur", location: "Jagatpura, Jaipur", state: "Rajasthan", price: 18000, rating: 4.3, reviews: 34, badge: "", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], featured: false, categoryTags: [] },
  { id: 120, title: "Corner Shop with High Footfall", type: "commercial", propertyType: "Shop", rentMode: "rent", city: "Jaipur", location: "Johari Bazaar, Jaipur", state: "Rajasthan", price: 60000, rating: 4.8, reviews: 22, badge: "Top Rated", images: ["https://images.unsplash.com/photo-1582055610731-893fa141eab1?w=800"], featured: false, categoryTags: [] }
`;

// Insert before the last closing bracket
const lastBracketIndex = data.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  data = data.substring(0, lastBracketIndex) + ',' + newRentData + '\\n];';
  fs.writeFileSync(path, data);
  console.log('Added 10 new rent properties for Jaipur');
} else {
  console.log('Could not find closing bracket in listingsData.js');
}
