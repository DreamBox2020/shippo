import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [eslint(), react()],
  server: {
    port: 3001,
    host: '0.0.0.0',
    // proxy: {
    //   '/v1': {
    //     target: 'http://127.0.0.1:8233',
    //     changeOrigin: true,
    //   },
    // },
  },
})
