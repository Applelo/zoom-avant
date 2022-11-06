/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@zoom-avant\/(.*?)$/,
        replacement: fileURLToPath(
          new URL('./packages/$1/src', import.meta.url)
        )
      }
      // {
      //   find: /^pinia$/,
      //   replacement: fileURLToPath(
      //     new URL('./packages/pinia/src', import.meta.url)
      //   ),
      // },
    ]
  },
  test: {
    coverage: {
      reporter: ['html', 'lcov', 'text'],
      include: ['packages/vue/src/**/*.ts'],
      exclude: ['**/src/index.ts', '**/*.d.ts']
    }
  }
})
