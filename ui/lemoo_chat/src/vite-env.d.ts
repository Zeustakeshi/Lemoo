/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_SOCKET_BASE_URL: string;
    readonly VITE_SSO_CALLBACK_URL: string;
    readonly VITE_BASE_DOMAIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
