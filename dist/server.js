"use strict";
exports.__esModule = true;
var app = require("./app");
var PORT = +process.env.PORT;
app.listen(PORT, function () {
    console.log("Server listening on http://localhost:".concat(PORT));
});
