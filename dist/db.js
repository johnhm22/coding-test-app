var Client = require("pg").Client;
var DB_URI = process.env.DATABASE_URL;
// if(process.env.NODE_ENV === "test"){
//     DB_URI = "postgresql:///mymovies_test";
// } else {
//     DB_URI = "postgresql:///mymovies";
// }
var db = new Client({
    connectionString: DB_URI,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect();
module.exports = db;
