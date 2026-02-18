import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
    // Only dashboard needs to be built with Vite
    // maintenance.html is now a static file
    const input = {
        dashboard: resolve(__dirname, 'dashboard.html')
    };

    return {
        plugins: [react(), viteSingleFile()],
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
                input,
            },
            emptyOutDir: true,
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
    }
})