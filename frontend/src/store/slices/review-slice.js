import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
  },
  reducers: {
    //newReview,getReview request
    reviewRequest(state) {
      state.loading = true;
    },
    deleteReviewRequest(state) {
      state.loading = true;
    },
    newReviewSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    getReviewsSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
    },
    deleteReviewSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    //newReview,getReview fail
    reviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewFail(state, action) {
      state.error = action.payload;
    },
    newReviewReset(state, action) {
      state.success = false;
    },
    deleteReviewReset(state, actioon) {
      state.isDeleted = false;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const reviewActions = reviewSlice.actions;

export default reviewSlice;
