import React from "react";

import Line from "./graphs/Line.js";
import { health } from "../../../data/health.js";

const Weight = ({}) => {
    console.log({ timestamps: health.map(d => `${d.timestamp} - ${d.date}`) });
    return (
        <div>
            <h2>Weight</h2>
            <p>There are {health.length} entries</p>
            {/* <Line data={health.slice(0, 100)} /> */}
            <Line data={health} />
        </div>
    );
};

export default Weight;
