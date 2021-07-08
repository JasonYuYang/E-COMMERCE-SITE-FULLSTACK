import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    newProduct: {},
    productDetails: {},
  },
  reducers: {
    allProductsRequest(state) {
      state.loading = true;
      state.products = [];
    },
    allProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resPerPage = action.payload.resPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    adminProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    allProductsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.newProduct = action.payload.product;
    },
    newProductFail(state, action) {
      state.error = action.payload;
    },
    newProductReset(state) {
      state.success = false;
    },
    productDetailsRequest(state) {
      state.loading = true;
    },
    productDetailsSuccess(state, action) {
      state.loading = false;
      state.productDetails = action.payload;
    },
    productDetailsFail(state, action) {
      state.error = action.payload;
    },

    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
