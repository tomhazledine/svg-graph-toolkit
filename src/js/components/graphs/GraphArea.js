import React from "react";
import * as d3 from "d3";

import { slugify } from "../../utils.js";

const GraphArea = ({
    data,
    className = "test-graph",
    scales,
    curve = false,
    label = "",
    baseline = 0
}) => {
    const shapeGenerator = d3
        .area()
        .defined(d => typeof d.y === "number")
        .x(d => scales.x(d.x))
        .y0(_ => scales.y(baseline))
        .y1(d => scales.y(d.y));

    if (curve) {
        shapeGenerator.curve(d3.curveCatmullRom.alpha(0.5));
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