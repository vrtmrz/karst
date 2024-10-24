var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve, basename } from 'node:path';
import { glob } from 'glob';
var input = glob.sync(["pages/*.html", "pages/**/*.html"]).filter(function (path) { return !(basename(path).startsWith("_")); }).reduce(function (acc, path) {
    // const path = pathSrc.split(sep).join("/");
    var name = basename(path).replace(".html", "");
    acc[name] = resolve(__dirname, path);
    return acc;
}, {});
// console.log(input);
// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    base: "./",
    build: {
        rollupOptions: {
            input: __assign({ index: resolve(__dirname, 'index.html') }, input)
        },
    },
});
