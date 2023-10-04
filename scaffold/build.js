import * as esbuild from "esbuild";

export const build = async config => {
    try {
        await esbuild.build(config.esbuildConfig);
    } catch (e) {
        console.warn("esbuild error", e);
    }
};
