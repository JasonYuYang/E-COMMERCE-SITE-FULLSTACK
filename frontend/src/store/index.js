import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products-slice';
import authSlice from './auth-slice';
import userSlice from './user-slice';

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
