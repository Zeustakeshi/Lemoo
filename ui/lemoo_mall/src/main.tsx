import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { store } from "./store/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="lemoo-mall-theme">
                <Provider store={store}>
                    <AuthProvider>
                        <App></App>
                    </AuthProvider>
                </Provider>
                <Toaster position="bottom-right" reverseOrder={false} />
            </ThemeProvider>
            <ReactQueryDevtools
                buttonPosition="bottom-left"
                initialIsOpen={false}
            />
        </QueryClientProvider>
    </StrictMode>
);
