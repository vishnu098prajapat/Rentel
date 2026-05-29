import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from '../features/listings/listingsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import authReducer from '../features/auth/authSlice';
import hostReducer from '../features/host/hostSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    filters: filtersReducer,
    auth: authReducer,
    host: hostReducer,
  },
});
