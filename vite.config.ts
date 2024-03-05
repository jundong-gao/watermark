import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],




  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    lib: {
      formats: ['es', 'umd'],
      entry: path.resolve(__dirname, 'src/entry.ts'),
      name: 'gao-watermark',
      fileName: (format) => `gao-watermark.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
    }
  }
})
