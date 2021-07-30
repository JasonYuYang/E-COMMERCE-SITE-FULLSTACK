import axios from 'axios';
import { authActions } from '../slices/auth-slice';
import { userActions } from '../slices/user-slice';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(authActions.loadingUserRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/login', { email, password }, config);

    dispatch(authActions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(authActions.loadUserFail('INVALID E-MAIL OR PASSWORD!'));
  }
};
// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/logout');

    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutFail(error.response.data.message));
  }
};
// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authActions.loadingUserRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/signup', userData, config);

    dispatch(authActions.loadUserSuccess(data.user));
  } catch (error) {
    if (!error.response.data.message) {
      dispatch(authActions.loadUserFail('Registration Fail !! Please check your input data !!'));
    }
    dispatch(authActions.loadUserFail(error.response.data.message));
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(authActions.loadingUserRequest());

    const { data } = await axios.get('/api/v1/me');

    dispatch(authActions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(authActions.loadUserFail(error.response.data.message));
  }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(userActions.updateUserDataRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/v1/me/update', userData, config);

    dispatch(userActions.updateUserDataSuccess(data.success));
  } catch (error) {
    dispatch(userActions.updateUserDataFail(error.response.data.message));
  }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.updateUserDataRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put('/api/v1/password/update', passwords, config);

    dispatch(userActions.updateUserDataSuccess(data.success));
  } catch (error) {
    dispatch(userActions.updateUserDataFail(error.response.data.message));
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(userActions.resetForgotPasswordRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/v1/password/forgot', email, config);

    dispatch(userActions.forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(userActions.resetForgotPasswordFail(error.response.data.message));
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(userActions.resetForgotPasswordRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

    dispatch(userActions.resetPasswordSuccess(data.success));
  } catch (error) {
    dispatch(userActions.resetForgotPasswordFail(error.response.data.message));
  }
};

// Get all users - ADMIN
export const allUsers = () => async (dispatch) => {
  try {
    dispatch(userActions.allUsersRequest());

    const { data } = await axios.get('/api/v1/admin/users');

    dispatch(userActions.allUsersSuccess(data.users));
  } catch (error) {
    dispatch(userActions.allUsersFail(error.response.data.message));
  }
};

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(userActions.updateUserDataRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

    dispatch(userActions.updateUserDataSuccess(data.success));
  } catch (error) {
    dispatch(userActions.updateUserDataFail(error.response.data.message));
  }
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userActions.userDetailsRequest());

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch(userActions.userDetailsSuccess(data.user));
  } catch (error) {
    dispatch(userActions.userDetailsFail(error.response.data.message));
  }
};

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userActions.updateUserDataRequest());

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch(userActions.deleteUserDataSuccess(data.success));
  } catch (error) {
    dispatch(userActions.updateUserDataFail(error.response.data.message));
  }
};
// Clear Errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(authActions.clearErrors());
  };
};
