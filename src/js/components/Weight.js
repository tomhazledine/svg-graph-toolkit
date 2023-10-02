import React from "react";
import { format } from "date-fns";

import WeightYearGraph from "./WeightYearGraph.js";
import { health } from "../../../data/health.js";

const Weight = ({}) => {
    const dateBounds = [
        { year: 2018, start: 1514764800000, end: 1546300800000 },
        { year: 2019, start: 1546300800000, end: 1577836800000 },
        { year: 2020, start: 1577836800000, end: 1609459200000 },
        { year: 2021, start: 1609459200000, end: 1640995200000 },
        { year: 2022, start: 1640995200000, end: 1672531200000 },
        { year: 2023, start: 1672531200000, end: 1704067200000 }
    ];
    const axes = {
        x: {
            key: "timestamp",
            type: "timestamp"
        },
        y: { key: "kg", type: "number", scale: { min: 100, max: 120 } }
    };
    const getMinMax = (data, key) => {
        const values = data
            .map(d => d[key])
            .filter(d => d)
            .sort();
        return { min: values[0], max: values[values.length - 1] };
    };
    const minMax = getMinMax(health, "kg");

    const byWeight = [...health].sort((a, b) => a.kg - b.kg);

    const parseAxes = (axes, bounds) =>
        Object.keys(axes).reduce((acc, key) => {
            if (axes[key].type === "timestamp") {
                return {
                    ...acc,
                    [key]: {
                        ...axes[key],
                        scale: { min: bounds.start, max: bounds.end }
                    }
                };
            }
            return { ...acc, [key]: axes[key] };
        }, {});

    const parseStLb = st_lb => {
        const [st, lbRaw] = st_lb.split(" ");
        const [lb] = lbRaw.split("/");
        return `${st}st ${lb}lb`;
    };

    const heaviest = byWeight[byWeight.length - 1];
    const lightest = byWeight[0];
    const recent = health[health.length - 1];

    return (
        <div>
            <h2>Weight</h2>
            <p>I have measured my weight on {health.length} occasions.</p>
            <p>
                My heaviest was {heaviest.kg}kg ({parseStLb(heaviest.st_lb)}) on{" "}
                {format(heaviest.timestamp, "MMMM do, yyyy")}.
            </p>
            <p>
                My lightest was {lightest.kg}kg ({parseStLb(lightest.st_lb)}) on{" "}
                {format(lightest.timestamp, "MMMM do, yyyy")}.
            </p>
            <p>
                My most recent measurement was {recent.kg}kg (
                {recent.st_percent}st) on{" "}
                {format(recent.timestamp, "MMMM do, yyyy")}.
            </p>

            {dateBounds.map(({ year, start, end }, i) => {
                const yearData = health.filter(
                    d => d.timestamp < end && d.timestamp > start
                );
                return (
                    <div key={`year_${year}`}>
                        {/* <h3>{year}</h3> */}
                        <WeightYearGraph
                            first={i === 0}
                            last={i === dateBounds.length - 1}
                            data={yearData}
                            axes={parseAxes(axes, { start, end })}
                            blocks={[
                                {
                                    label: "Future",
                                    x0: recent.timestamp,
                                    x1: end,
                                    y0: 120,
                                    y1: 100
                                }
                                // {
                                //     label: "Test start fill",
                                //     x0: start,
                                //     x1: yearData.length
                                //         ? yearData[0].timestamp
                                //         : end,
                                //     y0: 120,
                                //     y1: 100
                                // },
                                // {
                                //     label: "Test end fill",
                                //     x0: yearData.length
                                //         ? yearData[yearData.length - 1]
                                //               .timestamp
                                //         : start,
                                //     x1: end,
                                //     y0: 120,
                                //     y1: 100
                                // }
                            ]}
                            lines={[
                                {
                                    label: "All time max",
                                    orientation: "horizontal",
                                    value: minMax.max
                                },
                                {
                                    label: "All time low",
                                    orientation: "horizontal",
                                    value: minMax.min
                                },
                                {
                                    label: "All time lightest",
                                    orientation: "vertical",
                                    value: lightest.timestamp
                                },
                                {
                                    label: "All time heaviest",
                                    orientation: "vertical",
                                    value: heaviest.timestamp
                                }
                            ]}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Weight;
