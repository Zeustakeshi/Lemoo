import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CartState {
    count: number;
}

// Define the initial state using that type
const initialState: CartState = {
    count: 1,
};

export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {},
});

export const {} = CartSlice.actions;

export const selectCart = (state: RootState) => state.Cart.value;

export default CartSlice.reducer;
