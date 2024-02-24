import { createSlice } from "@reduxjs/toolkit";

const videoPlayerSlice = createSlice({
  name: "player",
  initialState: {
    presentVideo: {},
    remainaingVideosList: [],
  },
  reducers: {
    storePresentVideo: (state, action) => {
      state.presentVideo = action.payload;
    },
    storeRemainingVideos: (state, action) => {
      state.remainaingVideosList = action.payload;
    },
  },
});
export const { storePresentVideo, storeRemainingVideos } =
  videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
