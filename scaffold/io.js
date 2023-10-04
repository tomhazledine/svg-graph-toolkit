import fs from "fs";
import { config } from "./index.js";

const checkDir = targetPath => {
    try {
        const stats = fs.lstatSync(targetPath);
        return {
            exists: true,
            dir: stats.isDirectory()
        };
    } catch (e) {
        return { exists: false, dir: false };
    }
};

const getAllFilePaths = root => {
    if (checkDir(root).exists && checkDir(root).dir) {
        if (config.verbose) console.log(`Reading ${root}`);
        const files = fs.readdirSync(root);
        return files.map(file => getAllFilePaths(`${root}/${file}`));
    }
    if (!checkDir(root).exists) {
        return [];
    }
    return root;
};

export const readFolder = (startPath, ignorePath = false) => {
    const allPaths = getAllFilePaths(startPath);
    const flattenedPaths = allPaths
        .flat(Infinity)
        .filter(path => !path.includes(ignorePath));
    return flattenedPaths;
};
