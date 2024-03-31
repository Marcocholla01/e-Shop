import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const couponCodeReducer = createReducer(initialState, {
  // get all Events -----Admin
  adminGetAllCouponCodesRequest: (state) => {
    state.adminCouponCodeloading = true;
  },
  adminGetAllCouponCodesSuccess: (state, action) => {
    state.adminCouponCodeloading = false;
    state.adminCouponCode = action.payload;
  },
  adminGetAllCouponCodesFailed: (state, action) => {
    state.adminCouponCodeloading = false;
    state.error = action.payload;
  },
  // get all coupon codes
  GetAllCouponCodesRequest: (state) => {
    state.CouponCodeloading = true;
  },
  GetAllCouponCodesSuccess: (state, action) => {
    state.CouponCodeloading = false;
    state.CouponCode = action.payload;
  },
  GetAllCouponCodesFailed: (state, action) => {
    state.CouponCodeloading = false;
    state.error = action.payload;
  },
});
