import React, { useEffect } from "react";
import * as d3 from "d3";
import { format, parse } from "date-fns";

const LineGraph = ({
    data,
    axes = {
        x: { key: "timestamp", type: "timestamp" },
        y: { key: "kg", type: "number", scale: { min: 90, max: 120 } }
    },
    className = "line-graph"
}) => {
    // console.log({ data });

    const layout = {
        width: 960,
        height: 400,
        margin: { top: 0, right: 20, bottom: 30, left: 20 }
    };

    const xAxis = React.createRef();

    const parseScale = axis =>
        axis.type === "timestamp" ? d3.scaleTime() : d3.scaleLinear();

    const parseDomain = (axis, data) => {
        const axisData = data.map(item => item[axis.key]).filter(d => d);
        const min = axisData.sort()[0];
        const max = axisData.sort().reverse()[0];
        return [min, max];
    };

    const graphDetails = {
        xScale: parseScale(axes.x)
            .range([0, layout.width])
            .domain(
                axes.x.scale
                    ? [axes.x.scale.min, axes.x.scale.max]
                    : parseDomain(axes.x, data)
            ),
        yScale: parseScale(axes.y)
            .range([layout.height, 0])
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

    const parsedData = data.map(d => ({
        x: d[axes.x.key],
        y: d[axes.y.key]
    }));

    const linesMarkup = [parsedData].map(set => {
        const path = graphDetails.lineGenerator(set);
        return (
            <path
                className={`line`}
                style={{ fill: "none", stroke: "red", strokeWidth: "1px" }}
                key={`graph-line`}
                d={path}
            />
        );
    });
    const circlesMarkup = [parsedData].map(set => {
        const points = set.map((d, i) => {
            console.log({ d });
            console.log({
                x: graphDetails.xScale(d.x),
                y: graphDetails.yScale(d.y)
            });
            return (
                <circle
                    key={`circle_${i}`}
                    r="1px"
                    cx={graphDetails.xScale(d.x)}
                    cy={graphDetails.yScale(d.y)}
                    style={{ fill: "red" }}
                />
            );
        });
        return <g key={`graph-circles`}>{points}</g>;
    });

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

    useEffect(() => {
        const axis = d3
            .axisBottom()
            .ticks(8)
            .tickFormat(d => format(d, "do MMM yyyy"))
            .scale(graphDetails.xScale);
        if (xAxis.current) {
            d3.select(xAxis.current).call(axis);
        }
    }, []);

    return (
        <div className={className}>
            <svg
                viewBox={`0 0 ${layout.width} ${
                    layout.height + layout.margin.bottom
                }`}
                preserveAspectRatio="none"
            >
                <g
                    ref={xAxis}
                    transform={`translate(${0},${layout.height})`}
                    className="x axis axis--x"
                />
                {/* <g className="lines">{linesMarkup}</g> */}
                <g className="circles">{circlesMarkup}</g>
                {/* <g className="areas">{areas}</g> */}
            </svg>
        </div>
    );
};

export default LineGraph;
