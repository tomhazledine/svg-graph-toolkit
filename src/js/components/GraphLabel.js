import React from "react";

const GraphLabel = ({
    classPrefix = "graph",
    className = "",
    text,
    position,
    layout,
    buffer = 20
}) => {
    const orientation = {
        y: position.y > layout.graph.top + buffer ? "top" : "bottom",
        x:
            position.x > layout.graph.right - buffer
                ? "right"
                : position.x < layout.graph.left + buffer
                ? "left"
                : "middle"
    };
    return (
        <text
            className={`${classPrefix}__label ${className}`}
            x={position.x}
            y={position.y}
            pointerEvents="none"
            textAnchor={orientation.x}
            dy={orientation.y === "top" ? "-0.6rem" : "1.2rem"}
        >
            {text}
        </text>
    );
};

export default GraphLabel;
