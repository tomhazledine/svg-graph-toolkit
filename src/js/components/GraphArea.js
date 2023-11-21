import React from "react";
import { area, curveCatmullRom } from "d3";

import { slugify } from "../utils/general.js";

/**
 * GraphArea is a functional component that renders an area on a graph using the provided scales and data.
 *
 * @param {Array} data - The data to be plotted.
 * @param {string} classPrefix - The prefix for the CSS class. Default is "graph".
 * @param {string} className - Additional CSS classes. Default is an empty string.
 * @param {Object} scales - An object containing the x and y scales.
 * @param {boolean} curve - Whether to apply a curve to the area. Default is false.
 * @param {string} label - The label for the area. Default is an empty string.
 * @param {number} baseline - The y-coordinate of the baseline of the area. Default is 0.
 */
const GraphArea = ({
    data,
    classPrefix = "graph",
    className = "",
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
            className={`${classPrefix}__area ${classPrefix}__area--${slugify(
                label
            )} ${className}`}
            d={d}
        />
    );
};

export default GraphArea;
