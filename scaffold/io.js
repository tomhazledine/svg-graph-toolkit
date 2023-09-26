import fs from "fs";
import path from "path";
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

export const readFile = path => {
    try {
        const data = fs.readFileSync(path, "utf8");
        return data;
    } catch (err) {
        throw err;
    }
};

const ensureDirectoryExistence = filePath => {
    const dirname = path.dirname(filePath);
    if (checkDir(dirname).exists) {
        return true;
    }
    if (config.verbose) console.log(`Creating folder ${dirname}`);
    fs.mkdirSync(dirname, { recursive: true });
    return true;
};

export const saveFile = (filePath, data) => {
    const targetExists = ensureDirectoryExistence(filePath);
    if (targetExists) {
        fs.writeFileSync(filePath, data, "utf8");
    }
};

export const copyFile = (originalFilePath, newFilePath) => {
    const targetExists = ensureDirectoryExistence(newFilePath);
    if (targetExists) {
        fs.copyFile(originalFilePath, newFilePath, err => {
            if (err) throw err;
        });
    }
};
