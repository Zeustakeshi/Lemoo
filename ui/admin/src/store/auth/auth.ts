import { USER_KEY } from "@/common/constants/user.const";
import { User } from "@/common/type/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
    user: User | null;
}

const getUseSession = () => {
    const userSession = sessionStorage.getItem(USER_KEY);
    if (!userSession) return null;
    return JSON.parse(userSession);
};

// Define the initial state using that type
const initialState: AuthState = { user: getUseSession() };

export const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
});

export const { setUser } = AuthSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default AuthSlice.reducer;
