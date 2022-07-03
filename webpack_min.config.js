const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "www"),
        filename: "[name].g.js",
    },
    target: "web",
};