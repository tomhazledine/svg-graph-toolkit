import React from "react";

import { slugify } from "../utils/general.js";

const GraphBlock = ({
    className = "test-graph",
    scales,
    x0,
    x1,
    y0,
    y1,
    label = ""
}) => (
    <rect
        className={`${className}__block ${className}__block--${slugify(label)}`}
        x={scales.x(x0)}
        y={scales.y(y0)}
        width={Math.abs(scales.x(x1) - scales.x(x0))}
        height={Math.abs(scales.y(y1) - scales.y(y0))}
    />
);

export default GraphBlock;
