import React from "react";

import { slugify } from "../../utils/general.js";
import GraphPoint from "./GraphPoint.js";

/**
 * @typedef {Object} DataPoint
 * @property {string} slug - The identification slug for the dataset
 * @property {number} x - The x-coordinate value
 * @property {number} y - The y-coordinate value
 */

/**
 * @typedef {DataPoint[]} data
 * An array of DataPoint objects
 *
 * @example
 * const sampleData = [
 *   { slug: "foo", x: 0, y: 1 },
 *   { slug: "foo", x: 1, y: 2 },
 *   { slug: "foo", x: 2, y: 3 }
 * ];
 */

const GraphPoints = ({
    data,
    className = "graph",
    scales,
    label = "Graph points",
    radius = 2,
    activePoints = []
}) => {
    const groupSlug = slugify(label);
    const circlesMarkup = data.map((d, i) => (
        <GraphPoint
            key={`${groupSlug}_point_${i}`}
            d={d}
            className={className}
            scales={scales}
            activePoints={activePoints}
            groupSlug={groupSlug}
            radius={radius}
        />
    ));

    return (
        <g
            className={`${className}__points ${className}__points--${groupSlug}`}
        >
            {circlesMarkup}
        </g>
    );
};

export default GraphPoints;
