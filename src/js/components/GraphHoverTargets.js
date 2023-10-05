import React from "react";
import { Delaunay } from "d3-delaunay";

import { slugify } from "../utils/general.js";

const HoverTargets = ({
    dataSets, // An array of data lists, each of which is an array of objects with `x`, `y`, and `slug` keys
    classPrefix = "graph",
    className = "",
    scales,
    label = "",
    layout,
    onClick = () => {},
    onMouseOver = () => {}
}) => {
    if (dataSets.length < 1 || dataSets[0].length < 1) {
        return null;
    }

    const data = dataSets.flat();
    const delaunay = Delaunay.from(
        data.map(d => [scales.x(d.x), scales.y(d.y)])
    );

    const voronoi = delaunay.voronoi([
        layout.graph.left,
        layout.graph.top,
        layout.graph.right,
        layout.graph.bottom
    ]);

    const shapes = data.map((d, i) => {
        const path = voronoi.renderCell(i);
        return (
            <path
                key={`hover-target-${i}`}
                className={`
                    ${classPrefix}__hover-target
                    ${classPrefix}__hover-target--${slugify(label)}
                `}
                pointerEvents="all"
                d={path}
                onClick={e => onClick(e, d)}
                onMouseOver={e => onMouseOver(e, d)}
            />
        );
    });

    return (
        <g
            className={`
                ${classPrefix}__hover-targets
                ${classPrefix}__hover-targets--${slugify(label)}
                ${className}
            `}
        >
            {shapes}
        </g>
    );
};

export default HoverTargets;
