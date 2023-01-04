import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(config => {
    return {
        plugins: [
            react(),
            styleImport({
                libs: [
                    {
                        libraryName: 'zarm',
                        esModule: true,
                        resolveStyle: name => {
                            return `zarm/es/${name}/style/css`;
                        },
                    },
                ],
            }),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true, // 支持内联 JavaScript
                },
            },
            modules: {
                localsConvention: 'dashesOnly',
            },
        },
    };
});
