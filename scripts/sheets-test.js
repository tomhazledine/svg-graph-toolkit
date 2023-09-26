import google from "@googleapis/sheets";
import { config } from "dotenv";

config();

const sheets = google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_API_KEY
});

try {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "10fWoH-E7CQQvd5MLT-GewFYo4EtWiUiKxhHunB5Povc",
        range: "Weight!A:D"
    });
    const rows = response.data.values;
    if (rows.length) {
        rows.map(row => {
            console.log(row.join(", "));
        });
    } else {
        console.log("No data found.");
    }
} catch (err) {
    console.log("Oops");
    console.error(err);
}
