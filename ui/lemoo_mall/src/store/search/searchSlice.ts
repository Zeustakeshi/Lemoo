import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SearchState {
    searchLoading: boolean;
}

// Define the initial state using that type
const initialState: SearchState = {
    searchLoading: false,
};

export const SearchSlice = createSlice({
    name: "Search",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSearchLoading(state, action: PayloadAction<boolean>) {
            state.searchLoading = action.payload;
        },
    },
});

export const { setSearchLoading } = SearchSlice.actions;

export default SearchSlice.reducer;
