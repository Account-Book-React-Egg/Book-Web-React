import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(config => {
    return {
        plugins: [
            react(),
            createStyleImportPlugin({
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
        resolve: {
            // https://github.com/rollup/plugins/tree/master/packages/alias#entries
            // alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
});
