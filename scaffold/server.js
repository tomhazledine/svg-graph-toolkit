import http from "http";
import { Server } from "node-static";
import readline from "readline";

export const server = (buildPath, port) => {
    const file = new Server(buildPath);

    http.createServer(function (request, response) {
        request
            .addListener("end", function () {
                // Serve files!
                file.serve(request, response);
            })
            .resume();
    }).listen(port);
};

export const exit = () => {
    console.log(`Press "q" to exit`);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (str, key) => {
        if (key.name === "q") {
            process.exit();
        }
    });
};
