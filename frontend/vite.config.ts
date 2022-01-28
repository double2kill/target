import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

import {ORIGIN, PORT} from '../config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  build:  {
    outDir: '../server/public'
  },
  server: {
    proxy: {
      '^/api': {
        target: `${ORIGIN}:${PORT}`,
        changeOrigin: true,
      },
    }
  },
})
