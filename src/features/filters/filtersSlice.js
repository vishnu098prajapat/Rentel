import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  budget: { min: 0, max: 100000 },
  propertyType: 'all',
  checkIn: null,
  checkOut: null,
  guests: 1
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState
  }
});

export const { updateFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
