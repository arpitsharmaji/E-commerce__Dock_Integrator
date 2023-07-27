import { configureStore } from "@reduxjs/toolkit";
import productDetails from "./ProductSlice";
import UserDetail from "./UserAuth";
import CartDetails from "./Cart";
import orderdetails from "./Orders";
export const store = configureStore({
  reducer: {
    AllProducts: productDetails,
    user: UserDetail,
    cart: CartDetails,
    orders: orderdetails,
  },
});
