import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/products-slice';
import authSlice from './slices/auth-slice';
import userSlice from './slices/user-slice';
import cartSlice, { cartActions } from './slices/cart-slice';
import orderSlice from './slices/order-slice';
import reviewSlice from './slices/review-slice';

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    review: reviewSlice.reducer,
  },
});

const getCartItemsfromlocalStorage = () => {
  const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
  };
  store.dispatch(cartActions.hydrate(initialState));
  console.log(initialState);
};

getCartItemsfromlocalStorage();

export default store;
