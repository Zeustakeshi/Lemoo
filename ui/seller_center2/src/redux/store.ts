import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./address/addressSclice";
export const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
