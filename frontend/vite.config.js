import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            'playfair': ['"Playfair Display"', 'serif'],
            'lato': ['"Lato"', 'sans-serif'],
          },
          colors: {
            'midnight': '#2C3E50',
            'alabaster': '#F8F8F8',
            'gold-accent': '#D4AF37',
            'teal-accent': '#008080',
          }
        },
      },
      plugins: [],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});