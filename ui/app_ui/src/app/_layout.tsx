import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import "../global.css";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "/auth/register",
};

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            // await sleep(0);
        };
        prepare().then(() => {
            setAppIsReady(true);
        });
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <View className="size-[300]">
                    <Image
                        className="w-full h-full object-contain"
                        source={require("../assets/images/Android/ic_launcher_google_play.png")}
                    ></Image>
                </View>
            </View>
        );
    }

    return (
        <Provider store={store}>
            <View onLayout={onLayoutRootView} className="flex-1 bg-white">
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <Stack>
                            <Stack.Screen
                                name="chats/[id]"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                name="index"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                options={{
                                    headerShown: false,
                                }}
                                name="shorts"
                            ></Stack.Screen>

                            <Stack.Screen
                                options={{
                                    headerShown: false,
                                }}
                                name="categories"
                            ></Stack.Screen>

                            <Stack.Screen
                                name="products/[productId]"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                name="search/[keyword]/index"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                name="search/[keyword]/results"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                name="welcome"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                options={{
                                    headerShown: false,
                                }}
                                name="auth"
                            ></Stack.Screen>

                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    freezeOnBlur: false,
                                    headerShown: false,
                                }}
                            ></Stack.Screen>
                        </Stack>
                    </AuthProvider>
                </QueryClientProvider>
                <Toast />
                <StatusBar style="auto" />
            </View>
        </Provider>
    );
};

export default RootLayout;
