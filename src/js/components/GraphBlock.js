import React from "react";

import { slugify } from "../utils/general.js";

/**
 * GraphBlock is a functional component that renders a rectangle using the provided scales and coordinates.
 *
 * @param {string} classPrefix - The prefix for the CSS class. Default is "graph".
 * @param {string} className - Additional CSS classes. Default is an empty string.
 * @param {Object} scales - An object containing the x and y scales.
 * @param {number} x0 - The x-coordinate of the left side of the rectangle.
 * @param {number} x1 - The x-coordinate of the right side of the rectangle.
 * @param {number} y0 - The y-coordinate of the top side of the rectangle.
 * @param {number} y1 - The y-coordinate of the bottom side of the rectangle.
 * @param {string} label - The label for the rectangle. Default is an empty string.
 */
const GraphBlock = ({
    classPrefix = "graph",
    className = "",
    scales,
    x0,
    x1,
    y0,
    y1,
    label = ""
}) => (
    <rect
        className={`${classPrefix}__block ${classPrefix}__block--${slugify(
            label
        )} ${className}}`}
        x={scales.x(x0)}
        y={scales.y(y0)}
        width={Math.abs(scales.x(x1) - scales.x(x0))}
        height={Math.abs(scales.y(y1) - scales.y(y0))}
    />
);

export default GraphBlock;
