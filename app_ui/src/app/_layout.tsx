import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
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
            <QueryClientProvider client={queryClient}>
                <Stack>
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
                        name="auth"
                    ></Stack.Screen>
                </Stack>
                <StatusBar />
            </QueryClientProvider>
            <Toast />
        </SafeAreaView>
    );
};

export default RootLayout;
