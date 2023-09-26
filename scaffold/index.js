import path from "path";

import { config as rawConfig } from "../app.config.js";
import { exit, server } from "./server.js";
import { parseArgs, parseConfig } from "./utils.js";
import { build } from "./build.js";
import { initWatch } from "./watch.js";

const args = parseArgs(process.argv);

const plainConfig = parseConfig(rawConfig, args);

const esbuildConfig = {
    entryPoints: plainConfig.entryPoints,
    entryNames: `${plainConfig.appName}.[name]`,
    bundle: true,
    outdir: `build`,
    loader: { ".js": "jsx" },
    sourcemap: args.mode === "development"
};

export const config = { ...plainConfig, esbuildConfig };

build(config);
if (args.mode === "development") {
    // Development mode
    if (args.serve) {
        console.log(`Serving result at http://localhost:${config.port}/`);
        server(config.out, config.port);
    }

    if (args.watch) {
        console.log(`Watching for changes...`);
        const foldersToWatch = [
            config.public,
            config.styles,
            ...config.scripts
        ];
        initWatch(foldersToWatch, build, config);
    }

    exit();
}
