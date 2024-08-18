import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 代理的目标服务器
        changeOrigin: true, // 是否更改源
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      }
    }
  }
})
