import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Path resolution
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@contexts': resolve(__dirname, 'src/contexts'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@services': resolve(__dirname, 'src/services'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@i18n': resolve(__dirname, 'src/i18n'),
        },
    },

    // Development server configuration
    server: {
        port: 3000,
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5003',
                changeOrigin: true,
                secure: false,
            },
        },
    },

    // Build configuration
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks for better caching
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    ui: ['framer-motion', 'react-icons', 'react-hot-toast'],
                    video: ['react-player'],
                    i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
                },
            },
        },
        // Increase chunk size warning limit for video streaming app
        chunkSizeWarningLimit: 1000,
    },

    // CSS configuration
    css: {
        devSourcemap: true,
        postcss: './postcss.config.js',
    },

    // Environment variables
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Optimization
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
            'axios',
            'react-hook-form',
            'react-icons',
            'framer-motion',
            'react-hot-toast',
            'i18next',
            'react-i18next',
        ],
    },

    // Preview server (for production build testing)
    preview: {
        port: 3001,
        host: true,
    },
})