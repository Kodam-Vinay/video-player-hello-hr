import { createSlice } from "@reduxjs/toolkit";

const VideoSlice = createSlice({
  name: "video",
  initialState: {
    videosList: [],
    pageNo: 1,
  },
  reducers: {
    storeVideosList: (state, action) => {
      state.videosList = action?.payload;
    },
    changePageNo: (state, action) => {
      state.pageNo = action.payload;
    },
  },
});

export const { storeVideosList, changePageNo } = VideoSlice.actions;
export default VideoSlice.reducer;
