import { defineConfig } from 'vite';

console.log('>>> VITE CONFIG LOADED <<<');   // <-- debería verse en la terminal al arrancar

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8083/TrainBook',
        changeOrigin: true,
      },
    },
  },
});
