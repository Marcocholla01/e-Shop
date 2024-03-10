import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  allProducts: [],
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

  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete products of shop
  deleteShopProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteShopProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteShopProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    // console.log("Payload received:", action.payload);
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products -----Admin
  adminGetAllProductsRequest: (state) => {
    state.adminProductsloading = true;
  },
  adminGetAllProductsSuccess: (state, action) => {
    state.adminProductsloading = false;
    state.adminProducts = action.payload;
  },
  adminGetAllProductsFailed: (state, action) => {
    state.adminProductsloading = false;
    state.error = action.payload;
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
