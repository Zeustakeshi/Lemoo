import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
// import { store } from "./store/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="lemoo-mall-theme">
            {/* <Provider store={store}> */}
            <AuthProvider>
                <App></App>
                <Toaster position="bottom-right" />
            </AuthProvider>
            {/* </Provider> */}
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    // </StrictMode>
);
