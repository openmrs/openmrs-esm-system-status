import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
    const page = process.env.PAGE;

    let input = {};
    if (page === 'maintenance') {
        input = { maintenance: resolve(__dirname, 'maintenance.html') };
    } else if (page === 'dashboard') {
        input = { dashboard: resolve(__dirname, 'dashboard.html') };
    } else {
        input = {
            maintenance: resolve(__dirname, 'maintenance.html'),
            dashboard: resolve(__dirname, 'dashboard.html'),
        };
    }

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
            emptyOutDir: page === 'maintenance' ? true : false,
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