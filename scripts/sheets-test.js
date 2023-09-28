import google from "@googleapis/sheets";
import path from "path";
import { config } from "dotenv";
import { getTime, parse } from "date-fns";

import { saveFile } from "./io.js";
import { log } from "./console.js";

config();

const sheets = google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_API_KEY
});

log("Getting health data", "green");

try {
    log("· Reading Google Sheet...");
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "10fWoH-E7CQQvd5MLT-GewFYo4EtWiUiKxhHunB5Povc",
        range: "Weight!A:D"
    });
    log("· Parsing data...");
    const rows = response.data.values;
    const [headers, ...rawValues] = rows;
    const headerList = headers.map(header => `"${header}"`).join(" | ");
    log(
        `  · Found ${rawValues.length} rows with ${headers.length} columns: ${headerList}`
    );
    const values = rawValues.map(row => {
        const [rawDate, st_lb, st_percent, kg] = row;
        const date = parse(`${rawDate}12`, "yyyyMMddkk", new Date());
        return {
            date,
            timestamp: getTime(date),
            st_lb,
            st_percent: parseFloat(st_percent),
            kg: parseFloat(kg)
        };
    });
    log(`  · Earliest date: ${parse(values[0].timestamp, "T", new Date())}`);
    log(
        `  · Latest date: ${parse(
            values[values.length - 1].timestamp,
            "T",
            new Date()
        )}`
    );
    log("· Saving data as JSON...");
    saveFile(
        path.resolve(process.cwd(), "./data/health.js"),
        `const health = ${JSON.stringify(values)};`
    );
    log("Complete!", "green");
} catch (err) {
    log("Oops", "red");
    console.error(err);
}
