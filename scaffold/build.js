import * as esbuild from "esbuild";

import { readFolder, copyFile } from "./io.js";
import path from "path";
import { compileSass } from "./styles.js";

const publicFiles = config => {
    const publicFiles = readFolder(config.public);
    console.log(`Found ${publicFiles.length} files`);
    publicFiles.forEach(filePath =>
        copyFile(filePath, filePath.replace(config.public, config.out))
    );
};

export const build = async config => {
    try {
        await esbuild.build(config.esbuildConfig);
    } catch (e) {
        console.warn("esbuild error", e);
    }

    publicFiles(config);

    const allStyleFiles = readFolder(config.styles);
    allStyleFiles
        .filter(fullpath => !path.basename(fullpath).startsWith("_"))
        .forEach(stylePath => compileSass(stylePath, config));
};
