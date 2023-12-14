import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.loading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
});
