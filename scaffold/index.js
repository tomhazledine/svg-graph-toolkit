import { config as rawConfig } from "./app.config.js";
import { exit } from "./server.js";
import { parseArgs, parseConfig } from "./utils.js";
import { build } from "./build.js";
import { initWatch } from "./watch.js";

const args = parseArgs(process.argv);

const plainConfig = parseConfig(rawConfig, args);

const esbuildConfig = {
    entryPoints: plainConfig.entryPoints,
    entryNames: plainConfig.appName,
    bundle: true,
    outdir: `build`,
    platform: "node",
    loader: { ".js": "jsx" },
    sourcemap: args.mode === "development",
    external: ["react", "react-dom"]
};

export const config = { ...plainConfig, esbuildConfig };

build(config);
if (args.mode === "development") {
    console.log(`Watching for changes...`);
    initWatch(config.scripts, build, config);

    exit();
}
