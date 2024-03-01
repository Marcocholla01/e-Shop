import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update user informaation
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },

  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // update user address request
  updateUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },

  updateUserAddressFailed: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },

  deleteUserAddressFailed: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // clear errors
  clearErrors: (state) => {
    state.error = null;
  },

  clearMessages: (state) => {
    state.successMessage = null;
  },
});
