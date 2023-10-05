import React from "react";

import { slugify } from "../utils/general.js";

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
