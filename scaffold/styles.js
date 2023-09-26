import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import path from "path";
import postcss from "postcss";
import * as sass from "sass";

import { saveFile } from "./io.js";

export const compileSass = async (stylePath, config) => {
    let rawCSS;
    try {
        rawCSS = sass.compile(stylePath);
    } catch (err) {
        console.error(`Invalid SCSS: ${stylePath}`);
        console.error(err);
        return;
    }

    const compiledCSS = await postcss([autoprefixer, cssnano]).process(
        rawCSS.css,
        {
            from: stylePath
        }
    );

    const pathMeta = path.parse(stylePath);

    const prefix = config.appName ? `${config.appName}.` : "";

    const outPath = stylePath
        .replace(config.styles, config.out)
        .replace(pathMeta.base, `${prefix}${pathMeta.name}.css`);

    console.log(`Writing css to ${outPath}`);
    saveFile(outPath, compiledCSS.css);
};
