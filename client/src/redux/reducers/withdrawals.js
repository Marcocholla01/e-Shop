import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const withdrawReducer = createReducer(initialState, {
  adminGetAllWithdrawalRequest: (state) => {
    state.isLoading = true;
  },
  adminGetAllWithdrawalSuccess: (state, action) => {
    state.isLoading = false;
    state.allAdminWithdrawals = action.payload;
  },
  adminGetAllWithdrawalFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  sellerGetAllWithdrawalRequest: (state) => {
    state.isLoading = true;
  },
  sellerGetAllWithdrawalSuccess: (state, action) => {
    state.isLoading = false;
    state.allSellerWithdrawals = action.payload;
  },
  sellerGetAllWithdrawalFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get order based on Id
  WithdrawalRequest: (state) => {
    state.WithdrawalLoading = true;
  },
  WithdrawalSuccess: (state, action) => {
    state.WithdrawalLoading = false;
    state.Withdrawal = action.payload;
  },
  WithdrawalFailed: (state, action) => {
    state.WithdrawalLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
