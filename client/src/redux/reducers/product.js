import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  createPrductRequest: (state) => {
    state.isLoading = true;
  },
  createPrductSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.isProduct = true;
  },
  createPrductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isProduct = false;
  },

  // clearProductState: (state) => {
  //   // Add any necessary state clearing logic here
  //   state.product = null;
  //   state.isProduct = false;
  //   state.error = null;
  // },

  clearErrors: (state) => {
    state.error = null;
  },
});
