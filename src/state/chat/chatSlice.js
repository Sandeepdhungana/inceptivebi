import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../url";

export const chat = createAsyncThunk(
  "chat/chat",
  async ({ message }, { rejectWithValue }) => {
    if (!message) return;

    try {
      const response = await axios.post($`${url}/api/chat`, {
        message: message,
      });

      const { data } = response;
      const { message: reply } = data;
      return reply;
    } catch (error) {
      console.error("Error Sending message: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    botMessage: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chat.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(chat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.botMessage = action.payload;
      })
      .addCase(chat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData } = chatSlice.actions;

export default chatSlice.reducer;
