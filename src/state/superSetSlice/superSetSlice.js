import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service";

export const getDashboardDetails = createAsyncThunk(
  "superset/getDashboardDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/get-dashboard-details");

      const { data } = response;
      return data;
    } catch (error) {
      console.error("Error gettign data: ", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const superSetSlice = createSlice({
  name: "superset",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardDetails.pending, (state) => {
        state.status = "succeeded";
      })
      .addCase(getDashboardDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getDashboardDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default superSetSlice.reducer;
