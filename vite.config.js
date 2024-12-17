import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            'jquery': path.resolve(__dirname, 'node_modules/jquery'),  // 添加 jQuery 的別名
            'turn.js': path.resolve(__dirname, 'node_modules/turn.js')  // 添加 Turn.js 的別名
        }
    }
    
});
