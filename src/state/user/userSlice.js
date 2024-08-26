import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/get-user-details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      return data;
    } catch (error) {
      console.error("Error gettign data: ", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    name: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.status = "succeeded";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
