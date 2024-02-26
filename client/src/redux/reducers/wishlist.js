import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishList: localStorage.getItem(`wishListItems`)
    ? JSON.parse(localStorage.getItem(`wishListItems`))
    : [],
};

export const wishListReducer = createReducer(initialState, {
  addToWishList: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishList.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishList: state.wishList.map((i) => (i._id == isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        wishList: [...state.wishList, item],
      };
    }
  },

  removeFromWishList: (state, action) => {
    return {
      ...state,
      wishList: state.wishList.filter((i) => i._id !== action.payload),
    };
  },
});
