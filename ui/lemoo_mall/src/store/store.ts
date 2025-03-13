import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import { orderCartSlice } from "./order/orderSlice";
import { CustomerSlice } from "./customer/customerSclice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    orderCart: orderCartSlice.reducer,
    customer: CustomerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
