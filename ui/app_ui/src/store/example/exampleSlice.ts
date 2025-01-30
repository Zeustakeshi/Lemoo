import { createSlice } from "@reduxjs/toolkit";

export interface ExampleState {}

const initialState: ExampleState = {};

export const ExampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = ExampleSlice.actions;

export default ExampleSlice.reducer;
