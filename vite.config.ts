import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    reactRefresh(),
    tsconfigPaths(),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: {
        quality: 0.6,
      },
      png: {
        quality: 0.6,
      },
      jpeg: {
        quality: 0.6,
      },
      webp: {
        quality: 0.6,
      },
    }),
  ],
});
