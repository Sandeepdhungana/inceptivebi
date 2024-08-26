import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service";

export const login = createAsyncThunk(
  "login/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", formData);

      const { data } = response;
      return data;
    } catch (error) {
      console.error("Error Logging in: ", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", formData);
      const { data } = response;

      return data;
    } catch (error) {
      console.error("Error Logging in: ", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {
      status: "idle",
      accessToken: "",
      refreshToken: "",
      error: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.auth.status = "succeeded";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth.status = "succeeded";
        state.auth.accessToken = action.payload.token;
        state.auth.refreshToken = action.payload.refresh_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.auth.status = "failed";
        state.auth.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.auth.status = "succeeded";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.auth.status = "succeeded";
        state.auth.accessToken = action.payload.token;
        state.auth.refreshToken = action.payload.refresh_token;
      })
      .addCase(register.rejected, (state, action) => {
        state.auth.status = "failed";
        state.auth.error = action.payload;
      });
  },
});

export default authSlice.reducer;
