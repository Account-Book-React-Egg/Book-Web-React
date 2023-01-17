import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path';

// 当前执行 node 命令时文件夹的地址（工作目录）
const rootPath: string = process.cwd();

export default defineConfig((config: ConfigEnv) => {
    // vite 文件中，默认不加载 .env 文件, 可以使用 loadEnv 函数来加载指定的 .env 文件
    // https://cn.vitejs.dev/config/#environment-variables
    const { VITE_PORT, VITE_PROXY_DOMAIN } = loadEnv(config.mode, rootPath);

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
                // https://github.com/madyankin/postcss-modules
                // Dashes in class names will be camelized, the original class name will be removed from the locals
                localsConvention: 'dashesOnly',
            },
        },
        resolve: {
            // https://github.com/rollup/plugins/tree/master/packages/alias#entries
            // alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@typings': path.resolve(__dirname, 'src/typings'),
            },
        },
        server: {
            port: +VITE_PORT,
            proxy: {
                '/api': {
                    // 当遇到 /api 路径时，将其转换成 target 的值
                    target: VITE_PROXY_DOMAIN,
                    changeOrigin: true,
                    // rewrite: path => path.replace(/^\/api/, ''), // 将 /api 重写为空
                },
            },
        },
    };
});
