import { createSlice } from "@reduxjs/toolkit";

const UserDetail = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    UserFun: (state, action) => {
      state.user = action.payload;
    },

    Logout: (state) => {
      state.user = null;
      state.UserDetail = null;
      localStorage.removeItem("token", "cartData");
    },
  },
});
export const { Logout, UserFun } = UserDetail.actions;
export default UserDetail.reducer;
