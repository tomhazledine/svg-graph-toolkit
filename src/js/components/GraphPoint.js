import React, { useEffect, useState } from "react";

/**
 * @typedef {Object} DataPoint
 * @property {string} slug - The identification slug for the dataset
 * @property {number} x - The x-coordinate value
 * @property {number} y - The y-coordinate value
 */

/**
 * GraphPoint
 *
 * A single circle point on a graph, to be used within a GraphPoints component.
 *
 * @param {DataPoint} d - The data point to render
 * @param {DataPoint[]} activePoints - An array of "active" points
 * @param {string} groupSlug - The slug of the group
 * @param {string} classPrefix - Prepended to all auto-generated class names
 * @param {string} className - A class name to be added directly to the element
 * @param {Object} scales - The scales to use
 * @param {number} radius - The radius for the final circle
 * @returns {React.ReactNode} - The rendered circle
 */
const GraphPoint = ({
    d,
    activePoints,
    groupSlug,
    classPrefix = "graph",
    className = "",
    scales,
    radius
}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(() =>
            activePoints
                .filter(p => p)
                .filter(p => p.slug === d.slug)
                .find(p => p.x == d.x && p.y == d.y)
        );
    }, [activePoints]);

    return (
        <circle
            className={`
                ${classPrefix}__point
                ${classPrefix}__point--${groupSlug}
                ${active ? `${classPrefix}__point--active` : ""}
                ${className}
            `}
            r={`${radius}px`}
            cx={scales.x(d.x)}
            cy={scales.y(d.y)}
        />
    );
};

export default GraphPoint;
