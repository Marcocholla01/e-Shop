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
});
