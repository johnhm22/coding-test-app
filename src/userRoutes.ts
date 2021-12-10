export{}

const express = require('express');
const router = new express.Router();
const db = require("./db");


router.get('/register', async (req, res) => {
    try{
        res.render('register.html');
    }
    catch(e){
        console.log("There was an error when loading register page");
        res.render('home.html');
    }
});


router.post('/register', async (req, res) => {
    try{
        const {username, password} = req.body;
        const results = await db.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [username, password]);        
        req.session.username = username;
        res.render('home.html');
    }
    catch(e){
        console.log("There was an error when registering");
        res.render('register.html');
    }
});


router.get('/login', async (req, res) => {
    try{
        res.render('login.html');
    }
    catch(e){
        console.log("There was an error when loading login page");
        res.render('home.html');
    }
});


router.post('/login', async (req, res) => {
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
        res.render('login.html');
        }
    }
    catch(e){
        console.log("There was an error when logging in");
        res.render('home.html');
    }
});

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



router.get('/logout', (req, res) => {
    req.session.username = null;
    res.render('home.html');
    });


module.exports = router;