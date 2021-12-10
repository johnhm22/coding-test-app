export{}

const express = require('express');
const router = new express.Router();
const db = require("./db");



router.get('/faves', async (req, res) => {
    const username = req.session.username;
    try{
        if(req.session.username){
        const results = await db.query(
            `SELECT * FROM faves
            WHERE username=$1`,
            [username]);
        const faves = results.rows;
        res.render('faves.html', {faves: faves});
        } else {
            res.render('login.html');
        }
    }
    catch(e){
        console.log("Error in selecting faves from db");
        res.render('home.html');
    }
});


router.get('/faves/:movieid/:title', async (req, res) => {
    let username = req.session.username;
    const {movieid, title} = req.params;
    try{
        if(req.session.username){
        const results = await db.query(
            `INSERT INTO faves (movie_id, movie_title, username)
            VALUES ($1, $2, $3)`, 
            [movieid, title, username]);
        res.render('home.html');
        } else {
            res.render('login.html');
        }
    }
    catch(e){
        console.log("Error in adding fave details to db");
        res.render('login.html');
    }
});


module.exports = router;