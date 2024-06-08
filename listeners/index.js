const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
    const listenersPath = path.join(__dirname);
    const listenerFiles = fs
        .readdirSync(listenersPath)
        .filter(file => file.endsWith(".js") && file !== "index.js");

    for (const file of listenerFiles) {
        const filePath = path.join(listenersPath, file);
        const listener = require(filePath);
        if (typeof listener === "function") {
            listener(client);
        } else {
            console.warn(`[WARNING] The listener at ${filePath} is not exporting a function.`);
        }
    }
};
