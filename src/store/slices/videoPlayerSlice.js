import { createSlice } from "@reduxjs/toolkit";

const videoPlayerSlice = createSlice({
  name: "player",
  initialState: {
    presentVideo: {},
    remainaingVideosList: [],
    index: 0,
  },
  reducers: {
    storePresentVideo: (state, action) => {
      state.presentVideo = action.payload;
    },
    storeRemainingVideos: (state, action) => {
      state.remainaingVideosList = action.payload;
    },
    storeIndexValue: (state, action) => {
      state.index = action.payload;
    },
  },
});
export const { storePresentVideo, storeRemainingVideos, storeIndexValue } =
  videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
