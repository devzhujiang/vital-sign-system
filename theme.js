const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");

const varsPath = path.join(__dirname, "./src/themes/cover.less");
const vars = lessToJs(fs.readFileSync(varsPath, "utf8"));

module.exports = vars;
