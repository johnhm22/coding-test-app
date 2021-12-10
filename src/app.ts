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





module.exports = app;
