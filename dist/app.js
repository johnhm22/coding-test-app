"use strict";
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var nunjucks = require("nunjucks");
var db = require("./db");
var userRoutes = require('./userRoutes');
var movieRoutes = require('./movieRoutes');
var SECRET_KEY = require('./config').SECRET_KEY;
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY }));
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.get('/', function (req, res) {
    res.render("home.html");
});
module.exports = app;
