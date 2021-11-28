export{}

const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");
const axios = require("axios");
const db = require("./db");

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret: SECRET_KEY}));


nunjucks.configure('views', {
    autoescape: true,
    express: app
})

const BASE_URL_MOVIEDB = 'https://api.themoviedb.org/3';



const API_KEY = process.env.API_KEY;



interface ResultInterface {
    data: string,
    results: string
}

app.get('/', (req, res) => {
    res.render("home.html");
})


app.get('/faves/:movieid/:title', async (req, res) => {
    let username = req.session.username;
    const {movieid, title} = req.params;
    try{
        const results = await db.query(
            `INSERT INTO faves (movie_id, movie_title, username)
            VALUES ($1, $2, $3)`, 
            [movieid, title, username]);
        res.render('home.html');
    }
    catch(e){
        console.log("Error in adding fave details to db");
        res.render('home.html');
    }
})


app.get('/users/faves', async (req, res) => {
    const username = req.session.username;
    try{
        const results = await db.query(
            `SELECT * FROM faves
            WHERE username=$1`,
            [username]);
        const faves = results.rows;
        res.render('faves.html', {faves: faves});

    }
    catch(e){
        console.log("Error in selecting faves from db");
        res.render('home.html');
    }
})


app.get('/search', async (req, res) => {
    try{
    const {title} = req.query;
    const result: ResultInterface = await axios.get(`${BASE_URL_MOVIEDB}/search/movie?api_key=${API_KEY}&query=${title}`);
    const movies: string = result.data.results;
    res.render("movielist.html", {movies: movies});
    }

    catch(e){
        console.log("Error in providing list of movies");
        res.render("home.html");
    }
})

app.get('/movie/:movieid', async (req, res) => {
    try{
        const {movieid} = req.params;        
        const result: ResultInterface = await axios.get(`${BASE_URL_MOVIEDB}/movie/${movieid.substring(1)}?api_key=${API_KEY}`);        
        let data = result.data;
        res.render("moviedetail.html", {data: data});
    }
    catch(e){
        console.log("Error in providing movie details");
        res.render("home.html");
    }
})


app.get('/users/register', async (req, res) => {
    try{
        res.render('register.html');
    }
    catch(e){
        console.log("There was an error when loading register page");
        res.render('home.html');
    }
})

app.post('/users/register', async (req, res) => {
    try{
        const {username, password} = req.body;
        const results = await db.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [username, password]);        
        req.session.username = username;
        res.render('home.html');
    }
    catch(e){
        console.log("There was an error when registering");
        res.render('home.html');
    }
})

app.get('/users/login', async (req, res) => {
    try{
        res.render('login.html');
    }
    catch(e){
        console.log("There was an error when loading login page");
        res.render('home.html');
    }
})

app.post('/users/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const results = await db.query(
            `SELECT * FROM users password
            WHERE username = $1`, 
            [username]);
        const user = results.rows[0];        
        if(user.username) {
            req.session.username = username;
            res.render('home.html');
        } else{
        res.render('home.html');
        }
    }
    catch(e){
        console.log("There was an error when logging in");
        res.render('home.html');
    }
})


app.get('/users/logout', (req, res) => {
    req.session.username = null;
    res.render('home.html');
    })

module.exports = app;
