import { createSlice } from '@reduxjs/toolkit';
import { listingsData } from './listingsData';

const groupListings = (listings) => {
  const cities = ["Jaipur", "Goa", "Mumbai", "Bangalore", "Manali"];
  const grouped = {};
  cities.forEach(city => {
    grouped[city] = listings.filter(l => l.city === city);
  });
  return grouped;
};

const initialState = {
  listings: listingsData,
  filteredListings: listingsData,
  groupedByCity: groupListings(listingsData),
  selectedCategory: 'all',
  loading: false,
  featured: listingsData.filter(l => l.featured),
  wishlist: JSON.parse(localStorage.getItem('rentel_wishlist')) || []
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredListings = state.listings;
      } else {
        state.filteredListings = state.listings.filter(listing => 
          listing.type === action.payload || listing.categoryTags.includes(action.payload)
        );
      }
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter(item => item !== id);
      } else {
        state.wishlist.push(id);
      }
      localStorage.setItem('rentel_wishlist', JSON.stringify(state.wishlist));
    },
    filterBySearch: (state, action) => {
      const { city, propertyType } = action.payload;
      state.filteredListings = state.listings.filter(listing => {
        const matchCity = city ? listing.city.toLowerCase().includes(city.toLowerCase()) : true;
        const matchType = propertyType !== 'all' ? listing.type === propertyType : true;
        return matchCity && matchType;
      });
    }
  }
});

export const { setCategory, toggleWishlist, filterBySearch } = listingsSlice.actions;
export default listingsSlice.reducer;
