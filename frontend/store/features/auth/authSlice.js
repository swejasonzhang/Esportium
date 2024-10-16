import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const getUserDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = window.localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState = {
  user: getUserDataFromLocalStorage(),
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        window.localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementByAmount, logout } = authSlice.actions;
export default authSlice.reducer;
