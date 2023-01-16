/// <reference types="vite/client" />

// vite env 文件的ts类型支持 https://cn.vitejs.dev/guide/env-and-mode.html#env-files

interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_BASIC_URL: string;
    readonly VITE_PROXY_DOMAIN: string;

    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
