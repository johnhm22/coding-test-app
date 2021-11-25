export{}

const express = require("express");
const nunjucks = require("nunjucks");
const axios = require("axios");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

nunjucks.configure('./dist/views', {
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

app.get('/search', async (req, res) => {
    try{
    const {title} = req.query;
    const result: ResultInterface = await axios.get(`${BASE_URL_MOVIEDB}/search/movie?api_key=${API_KEY}&query=${title}`);
    const movies: string = result.data.results;
    res.render("movielist.html", {movies: movies});
    }
    catch(e){
        res.render("home.html");
    }
})


app.get('/moviedetail/:movieid', async (req, res) => {
    const {movieid} = req.params;
    const result: ResultInterface = await axios.get(`${BASE_URL_MOVIEDB}/movie/${movieid.substring(1)}?api_key=${API_KEY}`);
    let data = result.data;
    res.render("moviedetail.html", {data: data});
})


module.exports = app;
