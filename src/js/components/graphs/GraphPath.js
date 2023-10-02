import React from "react";
import * as d3 from "d3";

import { slugify } from "../../utils.js";

const GraphPath = ({
    data,
    className = "test-graph",
    scales,
    curve = false,
    label = ""
}) => {
    const lineGenerator = d3
        .line()
        .defined(d => typeof d.y === "number")
        .x(d => scales.x(d.x))
        .y(d => scales.y(d.y));

    if (curve) {
        lineGenerator.curve(d3.curveCatmullRom.alpha(0.5));
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
