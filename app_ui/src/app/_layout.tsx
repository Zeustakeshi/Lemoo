import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "/auth/register",
};

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <GestureHandlerRootView>
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
                                name="shorts/videos"
                                options={{
                                    headerShown: false,
                                }}
                            ></Stack.Screen>

                            <Stack.Screen
                                name="shorts/channel/[channelId]"
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
                                    headerShown: false,
                                }}
                            ></Stack.Screen>
                        </Stack>
                    </AuthProvider>
                </QueryClientProvider>
                <Toast />
                <StatusBar style="auto" />
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default RootLayout;
