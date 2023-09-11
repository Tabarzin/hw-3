import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@commonComponents': path.resolve(__dirname, './src/App/commonComponents'),
      '@pages': path.resolve(__dirname, './src/App/pages'),
      '@App': path.resolve(__dirname, './src/App'),
    },
  },
  plugins: [react()],
});
