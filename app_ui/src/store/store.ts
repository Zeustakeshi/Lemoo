import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import ChannelReducer from "./shorts/ChannelSlice";
import videoViewReducer from "./shorts/VideoViewSlice";

export const store = configureStore({
    reducer: {
        videoView: videoViewReducer,
        channel: ChannelReducer,
        category: categoryReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
