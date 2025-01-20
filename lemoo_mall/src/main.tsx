import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./lib/App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="lemoo-mall-theme">
                <App></App>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
