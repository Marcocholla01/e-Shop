import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { orderReducer } from "./reducers/order";
import { cartReducer } from "./reducers/cart";
import { wishListReducer } from "./reducers/wishlist";
import { withdrawReducer } from "./reducers/withdrawals";

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    order: orderReducer,
    withdraw: withdrawReducer,
  },
});

export default Store;
