export{}

const express = require('express');
const router = new express.Router();
const axios = require("axios");


const {
    API_KEY,    
    BASE_URL_MOVIEDB,
} = require('./config');

interface ResultInterface {
    data: string,
    results: string
};

router.get('/search', async (req, res) => {
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
});



router.get('/:movieid', async (req, res) => {
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
});


module.exports = router;