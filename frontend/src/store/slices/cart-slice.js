import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    shippingInfo: {},
  },
  reducers: {
    hydrate(state, action) {
      // do not do state = action.payload it will not update the store
      state.cartItems = action.payload.cartItems;
      state.saveShippingInfo = action.payload.shippingInfo;
    },
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
        //product is id string
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => (i.product === isItemExist.product ? item : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItemCart(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
