import React from "react";
import * as d3 from "d3";
import { format } from "date-fns";

import GraphBase from "./graphs/GraphBase.js";
import GraphPoints from "./graphs/GraphPoints.js";
import GraphLine from "./graphs/GraphLine.js";
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

    // const buildLine = ({
    //     label = "",
    //     className = "line",
    //     orientation = "horizontal",
    //     value,
    //     bounds
    // }) => {
    //     const data =
    //         orientation === "horizontal"
    //             ? [0, value, bounds.x, value]
    //             : [value, 0, value, bounds.y];

    //     return (
    //         <line
    //             key={`line_${slugify(label)}`}
    //             className={className}
    //             x1={data[0]}
    //             y1={data[1]}
    //             x2={data[2]}
    //             y2={data[3]}
    //         />
    //     );
    // };

    const graphDetails = {
        xScale: parseScale(axes.x)
            .range([layout.graph.left, layout.graph.right])
            .domain(
                axes.x.scale
                    ? [axes.x.scale.min, axes.x.scale.max]
                    : parseDomain(axes.x, data)
            ),
        yScale: parseScale(axes.y)
            .range([layout.graph.bottom, layout.graph.top])
            .domain(
                axes.y.scale
                    ? [axes.y.scale.min, axes.y.scale.max]
                    : parseDomain(axes.y, data)
            ),
        lineGenerator: d3.line().defined(d => typeof d.y === "number"),
        shapeGenerator: d3.area().defined(d => typeof d.y === "number")
    };

    graphDetails.lineGenerator.x(d => graphDetails.xScale(d.x));
    graphDetails.lineGenerator.y(d => graphDetails.yScale(d.y));
    // graphDetails.lineGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    // graphDetails.shapeGenerator.x(d => graphDetails.xScale(d.x));
    // graphDetails.shapeGenerator.y0(_ => graphDetails.yScale(0));
    // graphDetails.shapeGenerator.y1(d => graphDetails.yScale(d.y));
    // graphDetails.shapeGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    const pointsData = data.map(d => ({
        x: d[axes.x.key],
        y: d[axes.y.key]
    }));

    // const linesMarkup = [parsedData].map(set => {
    //     const path = graphDetails.lineGenerator(set);
    //     return (
    //         <path
    //             className={`line`}
    //             style={{ fill: "none", stroke: "red", strokeWidth: "1px" }}
    //             key={`graph-line`}
    //             d={path}
    //         />
    //     );
    // });

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
    // let areas = parsedData.map((d, key) => {
    //     const shape = graphDetails.shapeGenerator(d);
    //     const selected = d[0].active ? "selected" : "";
    //     if (d[0].slug === "happiness") return;
    //     return (
    //         <path
    //             d={shape}
    //             key={`graph-area-${d[0].slug}`}
    //             className={`chartarea area_${d[0].slug} ${selected}`}
    //         />
    //     );
    // });

    // const minMaxLines = lines.map(line => {
    //     const value =
    //         line.orientation === "horizontal"
    //             ? graphDetails.yScale(line.value)
    //             : graphDetails.xScale(line.value);
    //     return buildLine({
    //         ...line,
    //         value,
    //         bounds: { x: layout.width, y: layout.height }
    //     });
    // });

    return (
        <GraphBase
            axes={{
                bottom: {
                    type: axes.x.type,
                    ticks: 12,
                    scale: graphDetails.xScale,
                    format: d => format(d, "MMM")
                },
                left: {
                    scale: graphDetails.yScale,
                    ticks: 4
                }
            }}
            className={className}
            layout={layout}
        >
            <GraphPoints
                data={pointsData}
                className={className}
                scales={{ x: graphDetails.xScale, y: graphDetails.yScale }}
                // radius={3}
            />
            {lines.map(line => (
                <GraphLine
                    key={line.label}
                    label={line.label}
                    className={className}
                    orientation={line.orientation}
                    value={
                        line.orientation === "horizontal"
                            ? graphDetails.yScale(line.value)
                            : graphDetails.xScale(line.value)
                    }
                    bounds={layout.graph}
                />
            ))}
            {/* <g className="lines">{linesMarkup}</g> */}
            {/* <g className="blocks">{blocksMarkup}</g> */}
            {/* <g className="minMaxLines">{minMaxLines}</g> */}
            {/* <g className="areas">{areas}</g> */}
        </GraphBase>
    );
};

export default WeightYearGraph;
