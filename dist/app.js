"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var nunjucks = require("nunjucks");
var axios = require("axios");
var db = require("./db");
var _a = require('./config'), API_KEY = _a.API_KEY, SECRET_KEY = _a.SECRET_KEY, BASE_URL_MOVIEDB = _a.BASE_URL_MOVIEDB;
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: SECRET_KEY }));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.get('/', function (req, res) {
    res.render("home.html");
});
app.get('/users/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render('register.html');
        }
        catch (e) {
            console.log("There was an error when loading register page");
            res.render('home.html');
        }
        return [2 /*return*/];
    });
}); });
app.post('/users/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, results, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password])];
            case 1:
                results = _b.sent();
                req.session.username = username;
                res.render('home.html');
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log("There was an error when registering");
                res.render('register.html');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/users/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render('login.html');
        }
        catch (e) {
            console.log("There was an error when loading login page");
            res.render('home.html');
        }
        return [2 /*return*/];
    });
}); });
app.post('/users/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, results, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, db.query("SELECT * FROM users password\n            WHERE username = $1", [username])];
            case 1:
                results = _b.sent();
                user = results.rows[0];
                if (user.username) {
                    req.session.username = username;
                    res.render('home.html');
                }
                else {
                    res.render('login.html');
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                console.log("There was an error when logging in");
                res.render('home.html');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/users/logout', function (req, res) {
    req.session.username = null;
    res.render('home.html');
});
app.get('/faves/:movieid/:title', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, _a, movieid, title, results, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                username = req.session.username;
                _a = req.params, movieid = _a.movieid, title = _a.title;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!req.session.username) return [3 /*break*/, 3];
                return [4 /*yield*/, db.query("INSERT INTO faves (movie_id, movie_title, username)\n            VALUES ($1, $2, $3)", [movieid, title, username])];
            case 2:
                results = _b.sent();
                res.render('home.html');
                return [3 /*break*/, 4];
            case 3:
                res.render('login.html');
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_3 = _b.sent();
                console.log("Error in adding fave details to db");
                res.render('login.html');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/users/faves', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, results, faves, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.session.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!req.session.username) return [3 /*break*/, 3];
                return [4 /*yield*/, db.query("SELECT * FROM faves\n            WHERE username=$1", [username])];
            case 2:
                results = _a.sent();
                faves = results.rows;
                res.render('faves.html', { faves: faves });
                return [3 /*break*/, 4];
            case 3:
                res.render('login.html');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_4 = _a.sent();
                console.log("Error in selecting faves from db");
                res.render('home.html');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, result, movies, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                title = req.query.title;
                return [4 /*yield*/, axios.get("".concat(BASE_URL_MOVIEDB, "/search/movie?api_key=").concat(API_KEY, "&query=").concat(title))];
            case 1:
                result = _a.sent();
                movies = result.data.results;
                res.render("movielist.html", { movies: movies });
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log("Error in providing list of movies");
                res.render("home.html");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/movie/:movieid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieid, result, data, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                movieid = req.params.movieid;
                return [4 /*yield*/, axios.get("".concat(BASE_URL_MOVIEDB, "/movie/").concat(movieid.substring(1), "?api_key=").concat(API_KEY))];
            case 1:
                result = _a.sent();
                data = result.data;
                res.render("moviedetail.html", { data: data });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                console.log("Error in providing movie details");
                res.render("home.html");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = app;
