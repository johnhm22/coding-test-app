require('dotenv').config();
var BASE_URL_MOVIEDB = 'https://api.themoviedb.org/3';
module.exports = {
    PORT: process.env.PORT,
    API_KEY: process.env.API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    BASE_URL_MOVIEDB: BASE_URL_MOVIEDB
};
