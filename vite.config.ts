import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false  // 如果端口被占用，自动尝试下一个可用端口
  }
}) 
