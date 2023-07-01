import { createSlice} from "@reduxjs/toolkit";
// import axios from "axios";

// export const createUser = createAsyncThunk(
//   "createUser",
//   async (data, { rejectWithValue }) => {
//     const response = await axios.post("http://localhost:8080/products", data);
//     try {
//       const result = await response.data;
//       return result;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );

// export const getAllUsers = createAsyncThunk(
//   "getAllUsers",
//   async ({ rejectWithValue }) => {
//     const response = await axios.get("http://localhost:8080/products");
//     try {
//       const result = await response.data;
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const getUser = createAsyncThunk(
//   "getUser",
//   async (id, { rejectWithValue }) => {
//     const response = await axios.get(`http://localhost:8080/products/${id}`);
//     try {
//       console.log(response.data);
//       const result = await response.data;
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const deleteUser = createAsyncThunk(
//   "deleteUser",
//   async (id, { rejectWithValue }) => {
//     const response = await axios.delete(`http://localhost:8080/products/${id}`);
//     try {
//       const result = await response.data;
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

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
    loadingState:(state, action)=>{
      state.loading = action.payload
    }

  },
  // extraReducers: (builder) => {
  //   builder.addCase(createUser.pending, (state) => {
  //     state.loading = true;
  //   }),
  //     builder.addCase(createUser.fulfilled, (state, action) => {
  //       state.products.push(action.payload);
  //       state.loading = false;
  //     }),
  //     builder.addCase(createUser.rejected, (state, action) => {
  //       state.error = action.payload;
  //       state.loading = false;
  //     }),
  //     builder.addCase(getAllUsers.pending, (state) => {
  //       state.loading = true;
  //     }),
  //     builder.addCase(getAllUsers.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.products = action.payload;
  //     }),
  //     builder.addCase(getAllUsers.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     }),
  //     builder.addCase(getUser.pending, (state) => {
  //       state.loading = true;
  //     }),
  //     builder.addCase(getUser.fulfilled, (state, action) => {
  //       const { id } = action.payload;
  //       state.products = state.products.filter((elm) => elm.id === id);
  //       state.loading = false;
  //     }),
  //     builder.addCase(getUser.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     }),
  //     builder.addCase(deleteUser.pending, (state) => {
  //       state.loading = true;
  //     }),
  //     builder.addCase(deleteUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       const { id } = action.payload;
  //       state.products = state.products.filter((elm) => elm.id != id);
  //     }),
  //     builder.addCase(deleteUser.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const  {getAllProducts , loadingState} = ProductDetails.actions;
export default ProductDetails.reducer;
