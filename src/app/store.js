import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from '../features/listings/listingsSlice';
import filtersReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    filters: filtersReducer,
  },
});
