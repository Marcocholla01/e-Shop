import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  latestOrder: localStorage.getItem("latestOrder")
    ? JSON.parse(localStorage.getItem("latestOrder"))
    : null,
};

export const orderReducer = createReducer(initialState, {
  // get all orders of user
  getAllOrdersUserRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersUserFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all orders of shop
  getAllOrdersShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all orders for admin
  adminAllOrdersRequest: (state) => {
    state.adminOrderLoading = true;
  },
  adminAllOrdersSuccess: (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload;
  },
  adminAllOrdersFailed: (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  },

  // get order based on Id
  OrderRequest: (state) => {
    state.OrderLoading = true;
  },
  OrderSuccess: (state, action) => {
    state.OrderLoading = false;
    state.Order = action.payload;
  },
  OrderFailed: (state, action) => {
    state.OrderLoading = false;
    state.error = action.payload;
  },

  setLatestOrder: (state, action) => {
    state.latestOrder = action.payload;
    localStorage.setItem("latestOrder", JSON.stringify(action.payload));
  },

  clearOrder: (state) => {
    return {
      ...state,
      latestOrder: [],
    };
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
