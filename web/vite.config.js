import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), { enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */) }, react()],
  server: {
    proxy: {
      '/v1': 'http://localhost:5000',
    },
  },
})
