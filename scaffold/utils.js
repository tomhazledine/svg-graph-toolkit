import path from "path";

export const parseArgs = rawArgs => {
    const [a, b, ...relevant] = rawArgs;
    return relevant
        .map(arg => {
            const [key, value] = arg.split("=");
            return { [key.replace(/-/g, "")]: value || true };
        })
        .reduce((args, arg) => ({ ...args, ...arg }), {});
};

export const parseConfig = (config, args) => {
    const scriptFolders = config.entryPoints.map(entry =>
        path.dirname(path.resolve(".", entry))
    );
    return {
        ...config,
        verbose: args.verbose || args.v || false,
        scripts: [...new Set(scriptFolders)],
        out: path.resolve(".", config.out)
    };
};
