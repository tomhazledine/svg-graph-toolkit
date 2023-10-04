import React from "react";
import { area, curveCatmullRom } from "d3";

import { slugify } from "../utils/general.js";

const GraphArea = ({
    data,
    className = "test-graph",
    scales,
    curve = false,
    label = "",
    baseline = 0
}) => {
    const shapeGenerator = area()
        .defined(d => typeof d.y === "number")
        .x(d => scales.x(d.x))
        .y0(_ => scales.y(baseline))
        .y1(d => scales.y(d.y));

    if (curve) {
        shapeGenerator.curve(curveCatmullRom.alpha(0.5));
    }

    const d = shapeGenerator(data);

    return (
        <path
            className={`${className}__area ${className}__area--${slugify(
                label
            )}`}
            d={d}
        />
    );
};

export default GraphArea;
