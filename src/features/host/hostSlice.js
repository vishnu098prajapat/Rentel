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
      const newListing = {
        id: 'host_' + Date.now(), // Generate a unique ID
        ...state.draftListing,
        createdAt: new Date().toISOString(),
        // Add dummy defaults if anything is missing to make the UI look good
        images: state.draftListing.images || [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        hostName: 'You',
        rating: 0,
        reviewsCount: 0
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
