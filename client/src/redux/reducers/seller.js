import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // Get all sellers ----------Admin
  getAllSellersRequest: (state) => {
    state.adminSellerLoading = true;
  },
  getAllSellersSuccess: (state, action) => {
    state.adminSellerLoading = false;
    state.sellers = action.payload;
  },
  getAllSellersFail: (state, action) => {
    state.adminSellerLoading = false;
    state.error = action.payload;
  },
});
