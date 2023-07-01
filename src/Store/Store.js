import { configureStore } from "@reduxjs/toolkit";
 import productDetails from "./ProductSlice"
export const store = configureStore({
    reducer: {
        AllProducts:productDetails,
    }
});