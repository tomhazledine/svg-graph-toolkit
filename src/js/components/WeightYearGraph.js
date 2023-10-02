import React from "react";
import * as d3 from "d3";
import { format } from "date-fns";

import GraphBase from "./graphs/GraphBase.js";
import GraphPoints from "./graphs/GraphPoints.js";
import GraphPath from "./graphs/GraphPath.js";
import GraphLine from "./graphs/GraphLine.js";
import GraphArea from "./graphs/GraphArea.js";
import { parseLayout } from "./graphs/graph-utils.js";

const WeightYearGraph = ({
    data,
    axes,
    className = "test-graph",
    blocks = { horizontal: [], vertical: [] },
    lines = []
}) => {
    const layout = parseLayout({
        width: 1000,
        height: 100,
        margin: [6, 10, 20, 40]
    });

    const parseScale = axis =>
        axis.type === "timestamp" ? d3.scaleTime() : d3.scaleLinear();

    const parseDomain = (axis, data) => {
        const axisData = data
            .map(item => item[axis.key])
            .filter(d => d)
            .sort();
        const min = axisData[0];
        const max = axisData[axisData.length - 1];
        return [min, max];
    };

    const scales = {
        x: parseScale(axes.x)
            .range([layout.graph.left, layout.graph.right])
            .domain(
                axes.x.scale
                    ? [axes.x.scale.min, axes.x.scale.max]
                    : parseDomain(axes.x, data)
            ),
        y: parseScale(axes.y)
            .range([layout.graph.bottom, layout.graph.top])
            .domain(
                axes.y.scale
                    ? [axes.y.scale.min, axes.y.scale.max]
                    : parseDomain(axes.y, data)
            )
    };

    const pointsData = data.map(d => ({
        x: d[axes.x.key],
        y: d[axes.y.key]
    }));

    // const blocksMarkup = blocks.horizontal.map(block => {
    //     console.log({
    //         block_min: block.min,
    //         block_max: block.max,
    //         min_scaled: graphDetails.yScale(block.min),
    //         max_scaled: graphDetails.yScale(block.max),
    //         height:
    //             graphDetails.yScale(block.max) -
    //             graphDetails.yScale(block.min)
    //     });
    //     return (
    //         <rect
    //             key={`block_${block.min}_${block.max}`}
    //             x={0}
    //             // x={0}graphDetails.xScale(block.min)}
    //             y={graphDetails.yScale(block.max)}
    //             width={layout.width}
    //             height={Math.abs(
    //                 graphDetails.yScale(block.max) -
    //                     graphDetails.yScale(block.min)
    //             )}
    //             style={{ opacity: 0.1 }}
    //             // style={{
    //             //     fill: "none",
    //             //     strokeTop: "1px solid red",
    //             //     borderBottom: "1px solid green"
    //             // }}
    //         />
    //     );
    // });

    return (
        <GraphBase
            axes={{
                bottom: {
                    type: axes.x.type,
                    ticks: 12,
                    scale: scales.x,
                    format: d => format(d, "MMM")
                },
                left: {
                    scale: scales.y,
                    ticks: 4
                }
            }}
            className={className}
            layout={layout}
        >
            <GraphPoints
                data={pointsData}
                className={className}
                scales={scales}
                // radius={3}
            />
            <GraphArea
                label="the area"
                // curve
                data={pointsData}
                className={className}
                scales={scales}
                baseline={100}
            />
            <GraphPath
                label="the line"
                // curve
                data={pointsData}
                className={className}
                scales={scales}
            />
            {lines.map(line => (
                <GraphLine
                    key={line.label}
                    label={line.label}
                    className={className}
                    orientation={line.orientation}
                    value={
                        line.orientation === "horizontal"
                            ? scales.y(line.value)
                            : scales.x(line.value)
                    }
                    bounds={layout.graph}
                />
            ))}
            {/* <g className="blocks">{blocksMarkup}</g> */}
        </GraphBase>
    );
};

export default WeightYearGraph;
