import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve, sep, basename } from 'node:path';

import { glob } from 'glob';
const input = glob.sync(["pages/*.html", "pages/**/*.html"]).filter(path => !(basename(path).startsWith("_"))).reduce((acc, path) => {
  // const path = pathSrc.split(sep).join("/");
  const name = basename(path).replace(".html", "");
  acc[name] = resolve(__dirname, path);
  return acc;
}, {} as Record<string, string>);
// console.log(input);

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        ...input
      }
    },
  },
})
