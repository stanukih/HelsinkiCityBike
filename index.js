"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = process.env.PORT || 5000;
app_1.app.listen(5000, function () {
    return console.log("Server start ".concat(port));
});
