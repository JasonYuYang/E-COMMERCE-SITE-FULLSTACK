import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    newProduct: {},
    productDetails: {},
  },
  reducers: {
    //AdminProduct & AllProduct request
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
    //AdminProduct & AllProduct fail
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
    updateDeleteProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateDeleteProductFail(state, action) {
      state.error = action.payload;
    },
    updateProductReset(state) {
      state.isUpdated = false;
    },
    deleteProductReset(state) {
      state.isDeleted = false;
    },

    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
