export{}

const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");
const db = require("./db");
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');


const {
    SECRET_KEY,    
} = require('./config');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret: SECRET_KEY}));
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);


nunjucks.configure('views', {
    autoescape: true,
    express: app
});



app.get('/', (req, res) => {
    res.render("home.html");
});


app.get('/faves/:movieid/:title', async (req, res) => {
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


module.exports = app;
