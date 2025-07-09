import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        array: resolve(__dirname, 'src/array.ts')
      },
      name: 'dextro',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        ...require('./package.json').dependencies ? Object.keys(require('./package.json').dependencies) : [],
        ...require('./package.json').peerDependencies ? Object.keys(require('./package.json').peerDependencies) : []
      ],
      output: {
        exports: 'named',
      }
    },
    sourcemap: true,
    minify: 'terser',
    target: 'es2020',
  }
});