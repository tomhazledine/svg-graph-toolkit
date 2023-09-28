import google from "@googleapis/sheets";
import path from "path";
import { config } from "dotenv";
import { parse } from "date-fns";

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
    log(`· Found ${rawValues.length} rows with ${headers.length} columns:`);
    const headerList = headers.map(header => `"${header}"`).join(" | ");
    log(`    ${headerList}`);
    const values = rawValues.map(row => {
        const [date, st_lb, st_percent, kg] = row;
        return {
            date: parse(`${date}12`, "yyyyMMddkk", new Date()),
            st_lb,
            st_percent: parseFloat(st_percent),
            kg: parseFloat(kg)
        };
    });
    log("· Saving data as JSON...");
    saveFile(
        path.resolve(process.cwd(), "./build/data.json"),
        JSON.stringify(values)
    );
    log("Complete!", "green");
} catch (err) {
    log("Oops", "red");
    console.error(err);
}
