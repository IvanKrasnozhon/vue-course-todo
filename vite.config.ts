/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,        // позволяет писать describe/it без импорта
    environment: 'jsdom', // имитация браузера
    setupFiles: './test/setup.ts', // если нужен глобальный setup
  },
})
