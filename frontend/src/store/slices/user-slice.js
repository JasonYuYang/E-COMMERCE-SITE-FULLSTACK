import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {}, users: [] },
  reducers: {
    //UPDATE_PROFILE,UPDATE_PASSWORD,UPDATE_USER,DELETE_USER REQUEST
    updateUserDataRequest(state) {
      state.loading = true;
    },
    // UPDATE_PROFILE,UPDATE_PASSWORD,UPDATE_USER SUCCESS
    updateUserDataSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    // UPDATE_PROFILE,UPDATE_PASSWORD,UPDATE_USER,DELETE_USER FAIL
    updateUserDataFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    //DELETE_USER SUCCESS
    deleteUserDataSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    // RESET UPDATE_PROFILE,UPDATE_PASSWORD,UPDATE_USER
    resetUpdateUser(state) {
      state.isUpdated = false;
    },
    // RESET DELETE_USER
    resetDeleteUser(state) {
      state.isDeleted = false;
    },
    //NEW PASSWORD&FORGOT PASSWORD REQUEST
    resetForgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    resetForgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    resetForgotPasswordMessage(state) {
      state.message = '';
    },
    resetPasswordSuccess(state, action) {
      state.success = action.payload;
    },
    //ADMIN ALL USERS REQUEST
    allUsersRequest(state) {
      state.loading = true;
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsRequest(state, action) {
      state.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
