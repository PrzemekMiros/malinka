import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss(), { name: 'skip-disabled-toolbar-prebundle', configResolved(config) { config.optimizeDeps.include = []; } }],
    optimizeDeps: { noDiscovery: true, include: [] }
  }
});
