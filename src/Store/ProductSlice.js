import { createSlice } from "@reduxjs/toolkit";

const ProductDetails = createSlice({
  name: "ProductDetails",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getAllProducts, loadingState } = ProductDetails.actions;
export default ProductDetails.reducer;
