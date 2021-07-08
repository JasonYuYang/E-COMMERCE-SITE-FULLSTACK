import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products-slice';
import authSlice from './auth-slice';
import userSlice from './user-slice';
import cartSlice, { cartActions } from './cart-slice';

const getCartItemsfromlocalStorage = () => {
  const initialState = {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  };
  dispatch(cartActions.hydrate(initialState));
};

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

getCartItemsfromlocalStorage();

export default store;
