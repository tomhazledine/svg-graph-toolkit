import React from "react";

import { slugify } from "../utils/general.js";

const GraphLine = ({
    label = "",
    className = "line",
    orientation = "horizontal",
    value,
    bounds
}) => {
    const data =
        orientation === "horizontal"
            ? [bounds.left, value, bounds.right, value]
            : [value, bounds.bottom, value, bounds.top];

    return (
        <line
            className={`${className}__line ${className}__line--${slugify(
                label
            )}`}
            x1={data[0]}
            y1={data[1]}
            x2={data[2]}
            y2={data[3]}
        />
    );
};

export default GraphLine;
