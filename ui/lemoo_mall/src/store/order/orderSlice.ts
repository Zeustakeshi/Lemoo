import { CartSelectType } from "@/common/type/cart.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface orderCartState {
  items: CartSelectType;
}

const initialState: orderCartState = {
  items: { item: [] },
};

export const orderCartSlice = createSlice({
  name: "orderCart",
  initialState,
  reducers: {
    addCartOrder(state, action: PayloadAction<orderCartState>) {
      state.items = action.payload.items;
    },
  },
});

export const { addCartOrder } = orderCartSlice.actions;

export const selectOrderCart = (state: RootState) => state.orderCart;
export default orderCartSlice.reducer;
