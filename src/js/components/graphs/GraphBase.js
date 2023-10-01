import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

/**
 * @typedef {Object} Axis
 * @property {string} type - The type of data (timestamp or number)
 * @property {number} ticks - The number of ticks to use
 * @property {function} format - The function to use to format the ticks
 * @property {function} scale - The scale to use
 */

/**
 * @typedef {Object} Layout
 * This is generated by parseLayout in graph-utils.js.
 *
 * @property {number} width - The width of the graph
 * @property {number} height - The height of the graph
 * @property {number[]} margin - The margins of the graph (top, right, bottom, left)
 * @property {Object} graph - The graph details: width, height, top, left, right, bottom
 */

/**
 * GraphBase
 *
 * This provides the base for all graphs, including axes and a background.
 *
 * @param {Object} axes - The axes to use. Expects keys of "top", "right", "bottom", and "left". An axis object is defined above.
 * @param {string} className - The class name to use for the graph. This will be prepended to the auto-generated class names for internal elements (background, axes, etc.).
 * @param {Layout} layout - The layout to use.
 * @param {React.ReactNode} children - The children to render (paths, points, etc.)
 */
const GraphBase = ({ axes = {}, className = "graph", layout, children }) => {
    const axisRefs = {
        top: useRef(),
        right: useRef(),
        bottom: useRef(),
        left: useRef()
    };
    const axisTransforms = {
        top: `translate(${0},${layout.graph.top})`,
        right: `translate(${layout.graph.right},${0})`,
        bottom: `translate(${0},${layout.graph.bottom})`,
        left: `translate(${layout.graph.left},${0})`
    };

    const axesFunctions = {
        top: d3.axisTop(),
        right: d3.axisRight(),
        bottom: d3.axisBottom(),
        left: d3.axisLeft()
    };

    useEffect(() => {
        Object.keys(axes).forEach(key => {
            const axisData = axes[key];
            const axis = axesFunctions[key]
                .ticks(axisData.ticks || 8)
                .tickFormat(d =>
                    axisData.format
                        ? axisData.format(d)
                        : axisData?.type === "timestamp"
                        ? format(d, "do MMM yyyy")
                        : d
                )
                .scale(axisData.scale);
            if (axisRefs[key].current) {
                d3.select(axisRefs[key].current).call(axis);
            }
        });
    }, []);

    return (
        <svg
            className={className}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            preserveAspectRatio="none"
        >
            <rect
                className={`${className}__background`}
                x={layout.graph.left}
                y={layout.graph.top}
                width={layout.graph.width}
                height={layout.graph.height}
            />
            {Object.keys(axes).map(key => (
                <g
                    key={`axis_${key}`}
                    ref={axisRefs[key]}
                    transform={axisTransforms[key]}
                    className={`${className}__axis ${className}__axis--${key}`}
                />
            ))}
            {children}
        </svg>
    );
};

export default GraphBase;