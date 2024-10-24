//@ts-check

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { glob } from "glob";
import { sep } from "node:path";

const forceWrite = process.argv[2] == "force";

export function clean() {
    const files = glob.sync("pages/**/*.html");
    for (const file of files) {
        const basename = file.split(sep).pop();
        if (basename?.startsWith("_")) {
            console.log(`Skipping ${file}`);
            continue;
        }
        console.log(`Deleting ${file}`);
        unlinkSync(file);
    }
}
export function generatePageHTML() {
    const template = readFileSync("pages/_template.html", "utf-8");
    const files = glob.sync("src/pages/**/*.svelte");
    const out = "./pages";
    for (const file of files) {
        // console.log(file);
        const path = file.split(sep);
        const relativeFromHTML = "../" + path.join("/");
        path.shift(); // remove src
        path.shift(); // remove pages
        const outPath = out + "/" + path.join("/");
        const outFilename = outPath.replace(".svelte", ".html").toLowerCase();
        const fileContent = template.replace("%SVELTE_COMPONENT_PATH%", relativeFromHTML);
        const dir = outPath.split("/").slice(0, -1).join(sep);
        console.log(`Writing ${outFilename}`);
        console.log("dir", dir);
        if (existsSync(dir) === false) {
            mkdirSync(dir);
        }
        const outFilePlatformPath = outFilename.split("/").join(sep);
        if (!forceWrite && existsSync(outFilePlatformPath)) {
            console.log(`File ${outFilePlatformPath} already exists, skipping...`);
            continue;
        }
        writeFileSync(outFilePlatformPath, fileContent);
    }
}

if (process.argv[1].endsWith("gen_pagehtml.js")) {
    if (process.argv[2] === "clean") {
        clean();
    } else {
        generatePageHTML();
    }
}
