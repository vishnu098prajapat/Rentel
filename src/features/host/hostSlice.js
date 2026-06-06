import { createSlice } from '@reduxjs/toolkit';

// Load from local storage
const loadDraft = () => {
  try {
    const draft = localStorage.getItem('hostDraftListing');
    if (draft) return JSON.parse(draft);
  } catch (e) {
    console.error("Could not load draft", e);
  }
  return {};
};

const loadMyListings = () => {
  try {
    const listings = localStorage.getItem('hostMyListings');
    if (listings) return JSON.parse(listings);
  } catch (e) {
    console.error("Could not load my listings", e);
  }
  return [];
};

const initialState = {
  draftListing: loadDraft(),
  myListings: loadMyListings(),
};

const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    updateDraft: (state, action) => {
      state.draftListing = { ...state.draftListing, ...action.payload };
      try {
        localStorage.setItem('hostDraftListing', JSON.stringify(state.draftListing));
      } catch(e) {
        console.warn("Could not save to localStorage (quota likely exceeded):", e);
      }
    },
    clearDraft: (state) => {
      state.draftListing = {};
      localStorage.removeItem('hostDraftListing');
    },
    publishListing: (state) => {
      const draft = state.draftListing;
      
      const newListing = {
        id: 'host_' + Date.now(), // Generate a unique ID
        ...draft,
        title: draft.title || 'Untitled Property',
        type: draft.propertyType || 'flat',
        propertyType: draft.propertyType || 'Flat',
        rentMode: draft.listingPurpose === 'Short-term' ? 'holiday' : 'rent',
        city: draft.location?.city || 'Unknown City',
        location: draft.location?.city || 'Unknown Location',
        state: draft.location?.state || 'Unknown State',
        price: draft.listingPrice || draft.basePrice || 0,
        rating: 0,
        reviews: 0,
        badge: 'New Host',
        images: draft.photos && draft.photos.length > 0 ? draft.photos : [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        featured: false,
        categoryTags: draft.highlights || [],
        hostName: 'You',
        createdAt: new Date().toISOString()
      };
      
      state.myListings.push(newListing);
      try {
        localStorage.setItem('hostMyListings', JSON.stringify(state.myListings));
      } catch (e) {
        console.warn("Could not save my listings to localStorage:", e);
      }
      
      // Clear draft after publishing
      state.draftListing = {};
      try {
        localStorage.removeItem('hostDraftListing');
      } catch(e) {}
    },
    deleteListing: (state, action) => {
      state.myListings = state.myListings.filter(l => l.id !== action.payload);
      localStorage.setItem('hostMyListings', JSON.stringify(state.myListings));
    }
  }
});

export const { updateDraft, clearDraft, publishListing, deleteListing } = hostSlice.actions;
export default hostSlice.reducer;
