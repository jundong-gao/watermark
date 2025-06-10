import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/types/**/*.d.ts'],
      outDir: 'lib',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(/src\//, ''),
        content
      })
    })
  ],

  build: {
    cssCodeSplit: false,
    outDir: path.resolve(__dirname, 'lib'),
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true
      }
    },
    lib: {
      formats: ['es', 'umd'],
      entry: path.resolve(__dirname, 'src/entry.ts'),
      name: 'gao-watermark',
      fileName: (format) => `gao-watermark.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'index.css'
          }
          return assetInfo.name ? assetInfo.name : '[name][extname]'
        }
      }
    }
  }
})
