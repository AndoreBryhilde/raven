import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['**/__tests__/*.js'],
      exclude: [...configDefaults.exclude, 'e2e/*', './src/__tests__/_*.js'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./src/__tests__/_Setup.js'],
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      globals: true,
      coverage: {
        reporter: ['text', 'lcov', 'html'],
        exclude: ['**/main.js', '**/.eslintrc.cjs', '**/__tests__/*.js', '**/directive/*.js', '**/router/*.js','**/dev-dist/*.js'],
      },
    },
  }),
);
