import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    orders: [],
  },
  reducers: {
    //createOrder,orderDetails,myOrders,allOrders request
    ordersRequest(state) {
      state.loading = true;
    },
    updateOrderRequest(state) {
      state.loading = true;
    },
    deleteOrderRequest(state) {
      state.loading = true;
    },
    updateOrderSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteOrderSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    myOrderSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    orderDetailsSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    allOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;
    },
    updateOrderReset(state, action) {
      state.isUpdated = false;
    },
    deleteOrderReset(state, action) {
      state.isDeleted = false;
    },
    ordersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateDeleteOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
