import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      // 类名 前缀
      generateScopedName: '[local]-[hash:base64:5]',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    // port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // 后端服务实际地址
        changeOrigin: true, // 开启代理
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
