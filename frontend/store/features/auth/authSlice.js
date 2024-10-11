import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = authSlice.actions;
export default authSlice.reducer;
