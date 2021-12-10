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


app.get('/register', async (req, res) => {
    try{
        res.render('register.html');
    }
    catch(e){
        console.log("There was an error when loading register page");
        res.render('home.html');
    }
});


app.post('/register', async (req, res) => {
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

app.get('/login', async (req, res) => {
    try{
        res.render('login.html');
    }
    catch(e){
        console.log("There was an error when loading login page");
        res.render('home.html');
    }
});

app.post('/login', async (req, res) => {
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


app.get('/logout', (req, res) => {
    req.session.username = null;
    res.render('home.html');
    });



module.exports = app;
