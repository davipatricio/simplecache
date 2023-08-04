import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  format: ['cjs', 'esm'],
  target: 'node20',
  sourcemap: !options.watch,
  dts: !options.watch,
  minify: !options.watch,
}));
