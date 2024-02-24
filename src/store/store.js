import { configureStore } from "@reduxjs/toolkit";
import VideoSlice from "./slices/VideoSlice";
import errorSlice from "./slices/errorSlice";
import videoPlayerSlice from "./slices/videoPlayerSlice";

const store = configureStore({
  reducer: {
    video: VideoSlice,
    error: errorSlice,
    player: videoPlayerSlice,
  },
});
export default store;
