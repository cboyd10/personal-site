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
                const distDir = resolve(__dirname, 'dist');

                // Recursive function to minify JSON files in the `dist` directory
                const minifyRecursive = (dir) => {
                    const files = fs.readdirSync(dir);
                    files.forEach(file => {
                        const filePath = resolve(dir, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory()) {
                            minifyRecursive(filePath);
                        } else if (file.endsWith('.json')) {
                            const content = fs.readFileSync(filePath, 'utf-8');
                            try {
                                const minified = JSON.stringify(JSON.parse(content));
                                fs.writeFileSync(filePath, minified);
                            } catch (e) {
                                console.error(`Failed to minify ${filePath}:`, e);
                            }
                        }
                    });
                };

                if (fs.existsSync(distDir)) {
                    minifyRecursive(distDir);
                }
            },
        },
    ],
});
