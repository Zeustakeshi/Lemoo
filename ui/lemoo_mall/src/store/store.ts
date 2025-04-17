import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import { CustomerSlice } from "./customer/customerSclice";
import { orderCartSlice } from "./order/orderSlice";
import { SearchSlice } from "./search/searchSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        orderCart: orderCartSlice.reducer,
        customer: CustomerSlice.reducer,
        search: SearchSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
