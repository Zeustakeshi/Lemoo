import { AddressResponse } from "@/common/type/address.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CustomerState {
  customer?: AddressResponse[];
}

const initialState: CustomerState = {
  customer: [],
};

export const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    updateCustomer(state, action: PayloadAction<AddressResponse[]>) {
      state.customer = action.payload;
    },
  },
});

export const { updateCustomer } = CustomerSlice.actions;
export const selectCustomer = (state: RootState) => state.customer;
export default CustomerSlice.reducer;
