import { ChannelResponse } from "@/common/type/shorts.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChannelState {
    channel?: ChannelResponse;
}

const initialState: ChannelState = {};

export const ChannelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannel(state, action: PayloadAction<ChannelResponse | undefined>) {
            state.channel = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setChannel } = ChannelSlice.actions;

export default ChannelSlice.reducer;
