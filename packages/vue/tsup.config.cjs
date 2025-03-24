const vue = require('@vitejs/plugin-vue');

module.exports = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['vue'],
  outDir: 'dist',
  esbuildPlugins: [vue()],
}; 