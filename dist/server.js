"use strict";
exports.__esModule = true;
var app = require('./app');
var PORT = require("./config").PORT;
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
