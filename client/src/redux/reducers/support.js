import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  adminSupports: [],
  support: null,
};

export const supportReducer = createReducer(initialState, {
  // get all Supports -----Admin
  adminGetAllSupportsRequest: (state) => {
    state.adminSupportsloading = true;
  },
  adminGetAllSupportsSuccess: (state, action) => {
    state.adminSupportsloading = false;
    state.adminSupports = action.payload;
  },
  adminGetAllSupportsFailed: (state, action) => {
    state.adminSupportsloading = false;
    state.error = action.payload;
  },

  adminGetSupportDetailsRequest: (state) => {
    state.adminSupportsloading = true;
  },
  adminGetSupportDetailsSuccess: (state, action) => {
    state.adminSupportsloading = false;
    state.support = action.payload;
  },
  adminGetSupportDetailsFailed: (state, action) => {
    state.adminSupportsloading = false;
    state.error = action.payload;
  },
});
