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

    const byWeight = health.sort((a, b) => a.kg - b.kg);

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

    const heaviest = byWeight[byWeight.length - 1];
    const lightest = byWeight[0];

    return (
        <div>
            <h2>Weight</h2>
            <p>I have measured my weight on {health.length} occasions.</p>
            <p>
                My heaviest was {heaviest.kg}kg ({heaviest.st_lb}) on{" "}
                {format(heaviest.timestamp, "MMMM do, yyyy")}.
            </p>
            <p>
                My lightest was {lightest.kg}kg ({lightest.st_lb}) on{" "}
                {format(lightest.timestamp, "MMMM do, yyyy")}.
            </p>
            {dateBounds.map(({ year, start, end }) => (
                <div key={`year_${year}`}>
                    <h3>{year}</h3>
                    <WeightYearGraph
                        data={health.filter(
                            d => d.timestamp < end && d.timestamp > start
                        )}
                        axes={parseAxes(axes, { start, end })}
                        blocks={{ horizontal: [minMax] }}
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
                            }
                        ]}
                    />
                </div>
            ))}
        </div>
    );
};

export default Weight;
