import React from "react";
import { line, curveCatmullRom } from "d3";

import { slugify } from "../../utils/general.js";

const GraphPath = ({
    data,
    className = "test-graph",
    scales,
    curve = false,
    label = ""
}) => {
    const lineGenerator = line()
        .defined(d => typeof d.y === "number")
        .x(d => scales.x(d.x))
        .y(d => scales.y(d.y));

    if (curve) {
        lineGenerator.curve(curveCatmullRom.alpha(0.5));
    }

    const d = lineGenerator(data);

    return (
        <path
            className={`${className}__path ${className}__path--${slugify(
                label
            )}`}
            d={d}
        />
    );
};

export default GraphPath;
