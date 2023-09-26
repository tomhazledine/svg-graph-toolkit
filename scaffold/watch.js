import watch from "node-watch";

import { readFolder } from "./io.js";

export const initWatch = (foldersToWatch, build, config) => {
    foldersToWatch.map(path => console.log(`Watching folder: ${path}`));
    const pathsToWatch = foldersToWatch
        .map(folder => readFolder(folder))
        .flat();

    const changed = (_, file) => {
        if (config.verbose) console.log(`File changed: ${file}`);
        build(config);
    };

    if (config.verbose) {
        pathsToWatch.map(path => console.log(`  -  Watching file: ${path}`));
    }
    watch(pathsToWatch, { recursive: true }, changed);
};
