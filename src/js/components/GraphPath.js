import React from "react";
import { line, curveCatmullRom } from "d3";

import { slugify } from "../utils/general.js";

const GraphPath = ({
    data,
    classPrefix = "graph",
    className = "",
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
            className={`
                ${classPrefix}__path
                ${classPrefix}__path--${slugify(label)}
                ${className}
            `}
            d={d}
        />
    );
};

export default GraphPath;
