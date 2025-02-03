import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    reactRefresh(),
    tsconfigPaths(),
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
    }),
  ],
});
