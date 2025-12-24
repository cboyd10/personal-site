import {defineConfig} from 'vite';
import {resolve} from 'path';
import fs from 'fs';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
            },
        },
        minify: 'terser',
    },
    plugins: [
        {
            name: 'minify-json',
            closeBundle() {
                // Minify config.json after copying it to dist/config.json
                const configPath = resolve(__dirname, 'dist/config.json');
                if (fs.existsSync(configPath)) {
                    const configContent = fs.readFileSync(configPath, 'utf-8');
                    const minified = JSON.stringify(JSON.parse(configContent));
                    fs.writeFileSync(configPath, minified);
                }
            },
        },
    ],
});
