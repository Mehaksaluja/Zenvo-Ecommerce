import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; // <-- IMPORT IT
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // <-- ADD THE REDUCER
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  // This middleware is required for RTK Query's features like caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;