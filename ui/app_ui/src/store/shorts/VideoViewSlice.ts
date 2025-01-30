import { createSlice } from "@reduxjs/toolkit";

export interface VideoViewState {}

const initialState: VideoViewState = {};

export const VideoViewSlice = createSlice({
    name: "videoView",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = VideoViewSlice.actions;

export default VideoViewSlice.reducer;
