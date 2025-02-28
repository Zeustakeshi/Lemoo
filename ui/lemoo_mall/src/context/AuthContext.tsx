import { getUserInfo } from "@/api/user.api";
import { USER_STORAGE_KEY } from "@/common/constants/user";
import { TokenType } from "@/common/enum/token.enum";
import { User } from "@/common/type/user.type";
import { getSessionStorageValue, saveSessionStorage } from "@/lib/storage";
import * as tokenStore from "@/lib/tokenStore";
import { useMutation } from "@tanstack/react-query";
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

    const loadUser = useCallback(async () => {
        const user = getSessionStorageValue<User | null>(USER_STORAGE_KEY);

        if (user) {
            setUser(user);
            setIsAuthenticated(true);
            return;
        }

        // load channel info
        try {
            const user = await loadUserInfo();
            saveSessionStorage(USER_STORAGE_KEY, user);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error: any) {
            console.log({ error });
            await logout();
        }
    }, []);

    const logout = useCallback(async () => {
        // await logoutApi();
        sessionStorage.removeItem(USER_STORAGE_KEY);
        await tokenStore.removeToken(TokenType.ACCESS_TOKEN);
        await tokenStore.removeToken(TokenType.REFRESH_TOKEN);

        setUser(null);
        setIsAuthenticated(false);
        window.location.href = `http://sso.lemoo.com:5172/auth/login?callback_url=http://lemoo.com:5173`;
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, authLoading: isPending, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
