import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['react-bootstrap', 'bootstrap'],
          'chart-vendor': ['recharts'],
          'icon-vendor': ['react-icons'] // Removed 'bootstrap-icons' from chunking
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    cors: true
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      'bootstrap',
      'recharts',
      'axios',
      'react-icons',
      'bootstrap-icons' // Ensure this is optimized properly
    ]
  }
});
