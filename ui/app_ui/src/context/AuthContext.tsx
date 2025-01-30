import { logout as logoutApi } from "@/api/auth.api";
import { getUserInfo } from "@/api/user.api";
import { USER_STORAGE_KEY } from "@/common/constants/user";
import { TokenType } from "@/common/enum/token";
import { TokenPair } from "@/common/type/token";
import { User } from "@/common/type/user";
import storage from "@/lib/dataStore";
import { removeToken, saveToken } from "@/lib/tokenStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    authLoading: boolean;
    login: (tokens: TokenPair) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const { isPending, mutateAsync: loadUserInfo } = useMutation({
        mutationKey: ["user-info", "me"],
        mutationFn: () => getUserInfo(),
    });

    useEffect(() => {
        if (!isAuthenticated) loadUser();
    }, [isAuthenticated]);

    const login = useCallback(async (tokens: TokenPair) => {
        setIsAuthenticated(true);
        saveToken(tokens.accessToken);
        saveToken(tokens.refreshToken);
        loadUser();
    }, []);

    const logout = useCallback(async () => {
        await storage.remove(USER_STORAGE_KEY);
        await logoutApi();
        await removeToken(TokenType.ACCESS_TOKEN);
        await removeToken(TokenType.REFRESH_TOKEN);
        setUser(null);
        setIsAuthenticated(false);
        router.replace("/");
    }, []);

    const loadUser = useCallback(async () => {
        // check user info existed form  stograge
        const user = await storage.get<User>(USER_STORAGE_KEY);

        if (user) {
            setUser(user);
            setIsAuthenticated(true);
            return;
        }

        // load channel info
        try {
            const user = await loadUserInfo();
            storage.set(USER_STORAGE_KEY, JSON.stringify(user));
            setUser(user);
            setIsAuthenticated(true);
        } catch (error: any) {
            await logout();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                authLoading: isPending,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
