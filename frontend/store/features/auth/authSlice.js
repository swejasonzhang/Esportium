import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk(
  "auth/register",
  async (inputValues, thunkAPI) => {
    try {
      const response = await authService.loginUser(inputValues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (inputValues, thunkAPI) => {
    try {
      const response = await authService.loginUser(inputValues);
      window.localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "success";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementByAmount } = authSlice.actions;
export default authSlice.reducer;
