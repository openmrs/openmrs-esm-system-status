import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        proxy: {
            '/openmrs': {
                target: 'https://o3.openmrs.org',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        rollupOptions: {
            input: {
                maintenance: resolve(__dirname, 'maintenance.html'),
                dashboard: resolve(__dirname, 'dashboard.html'),
            },
        },
    },
    preview: {
        proxy: {
            '/openmrs': {
                target: 'https://o3.openmrs.org',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})