import React from "react";
import { area, curveCatmullRom } from "d3";
import { Delaunay } from "d3-delaunay";

import { slugify } from "../../utils.js";

const HoverTargets = ({
    data,
    className = "test-graph",
    scales,
    label = "",
    layout
}) => {
    const delaunay =
        data.length > 0
            ? Delaunay.from(data.map(d => [scales.x(d.x), scales.y(d.y)]))
            : false;

    const voronoi = delaunay
        ? delaunay.voronoi([
              layout.graph.left,
              layout.graph.top,
              layout.graph.right,
              layout.graph.bottom
          ])
        : false;

    const shapes = delaunay
        ? data.map((d, i) => {
              const path = voronoi.renderCell(i);
              return (
                  <path
                      key={`hover-target-${i}`}
                      className={`${className}__hover-target ${className}__hover-target--${slugify(
                          label
                      )}`}
                      pointerEvents="all"
                      d={path}
                  />
              );
          })
        : [];

    return (
        <g
            className={`${className}__hover-targets ${className}__hover-targets--${slugify(
                label
            )}`}
        >
            {delaunay && shapes}
        </g>
    );
};

export default HoverTargets;
