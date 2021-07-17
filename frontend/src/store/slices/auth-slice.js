import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    //login,signUp request
    loadingUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    //login,signUp success
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    //login,signUp fail
    loadUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
