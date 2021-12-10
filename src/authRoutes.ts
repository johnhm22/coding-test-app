export{}

const express = require('express');
const router = new express.Router();

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


module.exports = router;