import React, { useState } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

import GraphBase from "./graphs/GraphBase.js";
import GraphPoints from "./graphs/GraphPoints.js";
import GraphPath from "./graphs/GraphPath.js";
import GraphLine from "./graphs/GraphLine.js";
import GraphArea from "./graphs/GraphArea.js";
import GraphBlock from "./graphs/GraphBlock.js";
import GraphLabel from "./graphs/GraphLabel.js";
import GraphHoverTargets from "./graphs/GraphHoverTargets.js";
import { parseLayout } from "./graphs/graph-utils.js";

const WeightYearGraph = ({
    data,
    axes,
    className = "test-graph",
    blocks = [],
    lines = [],
    first,
    last
}) => {
    const [activePoint, setActivePoint] = useState(null);
    const layout = parseLayout({
        width: 1000,
        height: 100,
        margin: [first ? 20 : 6, 10, last ? 20 : 6, 40]
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
        y: d[axes.y.key],
        slug: "weight"
    }));

    let visibleAxes = {
        left: {
            scale: scales.y,
            ticks: 4
        }
    };

    if (first) {
        visibleAxes = {
            ...visibleAxes,
            top: {
                type: axes.x.type,
                ticks: 12,
                scale: scales.x,
                format: d => format(d, "MMM")
            }
        };
    }
    if (last) {
        visibleAxes = {
            ...visibleAxes,
            bottom: {
                type: axes.x.type,
                ticks: 12,
                scale: scales.x,
                format: d => format(d, "MMM")
            }
        };
    }

    const handleHover = (e, d) => {
        setActivePoint(d);
    };
    const handleMouseOut = () => {
        setActivePoint(null);
    };

    return (
        <GraphBase
            axes={visibleAxes}
            className={className}
            layout={layout}
            onMouseOut={handleMouseOut}
        >
            <GraphArea
                label="the area"
                data={pointsData}
                className={className}
                scales={scales}
                baseline={100}
            />
            <GraphPath
                label="the line"
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
            {blocks.map(block => (
                <GraphBlock
                    key={`block_${block.label}`}
                    className={className}
                    scales={scales}
                    {...block}
                />
            ))}

            <GraphPoints
                data={pointsData}
                className={className}
                scales={scales}
                activePoints={[activePoint]}
            />
            <GraphHoverTargets
                className={className}
                dataSets={[pointsData]}
                layout={layout}
                scales={scales}
                // onClick={(e, d) => console.log("click callback", d)}
                onMouseOver={handleHover}
            />
            {activePoint && (
                <>
                    <GraphLine
                        label="active x"
                        className={className}
                        orientation="vertical"
                        value={scales.x(activePoint.x)}
                        bounds={layout.graph}
                    />
                    <GraphLine
                        label="active y"
                        className={className}
                        orientation="horizontal"
                        value={scales.y(activePoint.y)}
                        bounds={layout.graph}
                    />
                    <GraphLabel
                        className={className}
                        text={`${activePoint.y} kg`}
                        layout={layout}
                        position={{
                            x: scales.x(activePoint.x),
                            y: scales.y(activePoint.y)
                        }}
                    />
                </>
            )}
        </GraphBase>
    );
};

export default WeightYearGraph;
