import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <App />
                <Toaster position="top-right" reverseOrder={true} />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </SocketProvider>
        </QueryClientProvider>
    </StrictMode>
);
