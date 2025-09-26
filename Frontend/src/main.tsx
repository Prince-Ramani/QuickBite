import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthUserContextProvider from "./Context/auth-user-provider.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthUserContextProvider>
                <App />
                <Toaster />
            </AuthUserContextProvider>
        </QueryClientProvider>
    </StrictMode>,
);
