import { CategoryResponse } from "@/common/type/categories";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
    categories: CategoryResponse[];
    activeCategory?: CategoryResponse;
}

const initialState: CategoryState = {
    categories: [],
};

export const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<CategoryResponse>) {
            state.activeCategory = action.payload;
        },
        setCategories(state, action: PayloadAction<CategoryResponse[]>) {
            state.categories = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setActiveCategory, setCategories } = CategorySlice.actions;

export default CategorySlice.reducer;
