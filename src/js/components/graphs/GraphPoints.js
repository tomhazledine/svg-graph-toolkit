import React from "react";

import { slugify } from "../../utils.js";

/**
 * @typedef {Object} DataPoint
 * @property {number} x - The x-coordinate value
 * @property {number} y - The y-coordinate value
 */

/**
 * @typedef {DataPoint[]} data
 * An array of DataPoint objects
 *
 * @example
 * const sampleData = [
 *   { x: 0, y: 1 },
 *   { x: 1, y: 2 },
 *   { x: 2, y: 3 }
 * ];
 */

const GraphPoints = ({
    data,
    className = "graph",
    scales,
    label = "Graph points",
    radius = 2
}) => {
    const slug = slugify(label);
    const circlesMarkup = data.map((d, i) => (
        <circle
            key={`${slug}_point_${i}`}
            className={`${className}__point`}
            r={`${radius}px`}
            cx={scales.x(d.x)}
            cy={scales.y(d.y)}
        />
    ));

    return (
        <g className={`${className}__points ${className}__points--${slug}`}>
            {circlesMarkup}
        </g>
    );
};

export default GraphPoints;
