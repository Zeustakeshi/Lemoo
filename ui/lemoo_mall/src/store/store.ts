import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import { orderCartSlice } from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    orderCart: orderCartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
