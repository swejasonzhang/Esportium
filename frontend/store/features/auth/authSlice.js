import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
