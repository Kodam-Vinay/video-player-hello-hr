import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    isError: false,
  },
  reducers: {
    toggleError: (state, action) => {
      state.isError = action?.payload;
    },
  },
});
export const { toggleError } = errorSlice.actions;
export default errorSlice.reducer;
