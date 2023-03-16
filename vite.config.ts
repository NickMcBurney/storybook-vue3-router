import { defineConfig } from "vite";
import Vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~dist/': `${path.resolve(__dirname, 'dist')}/`,
    }
  },
  plugins: [
    Vue(),
  ],
});