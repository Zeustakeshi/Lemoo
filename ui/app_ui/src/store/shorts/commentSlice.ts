import { createSlice } from "@reduxjs/toolkit";

export interface CommentState {}

const initialState: CommentState = {};

export const CommentSlice = createSlice({
    name: "Comment",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = CommentSlice.actions;

export default CommentSlice.reducer;
