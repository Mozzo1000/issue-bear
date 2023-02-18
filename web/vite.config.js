import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */) }, react()],
  server: {
    proxy: {
      '/v1': 'http://localhost:5000',
    },
  },
})
