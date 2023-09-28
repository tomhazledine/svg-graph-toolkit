import fs from "fs";
import path from "path";
import { log } from "./console.js";

const VERBOSE = true;

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
        if (VERBOSE) log(`Reading ${root}`, "green");
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

export const ensureDirectoryExistence = filePath => {
    const dirname = path.dirname(filePath);
    if (checkDir(dirname).exists) {
        return true;
    }
    if (VERBOSE) log(`Creating folder ${dirname}`, "green");
    fs.mkdirSync(dirname, { recursive: true });
    return true;
};

export const saveFile = (filePath, data) => {
    const targetExists = ensureDirectoryExistence(filePath);
    if (targetExists) {
        fs.writeFileSync(filePath, data, "utf8");
    }
};
