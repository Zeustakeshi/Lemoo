import { ChatMessageType } from "@/common/type/chat.ai.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatAiState {
    messages: ChatMessageType[];
}

// Define the initial state using that type
const initialState: ChatAiState = {
    messages: [],
};

export const ChatAiSlice = createSlice({
    name: "ChatAi",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addChatMessage(state, action: PayloadAction<ChatMessageType>) {
            state.messages.push(action.payload);
        },
        addChatMessageRange(state, action: PayloadAction<ChatMessageType[]>) {
            state.messages = [...state.messages, ...action.payload];
        },
    },
});

export const { addChatMessage, addChatMessageRange } = ChatAiSlice.actions;

export default ChatAiSlice.reducer;
