import { AddressResponse } from "@/common/type/AddressResponse";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AddressState {
  address?: AddressResponse[];
}

const initialState: AddressState = {
  address: [],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress(state, action: PayloadAction<AddressResponse[]>) {
      state.address = action.payload;
    },
  },
});

export const { updateAddress } = addressSlice.actions;
export const selectAddress = (state: RootState) => state.address;
export default addressSlice.reducer;
