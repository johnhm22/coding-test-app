const { Client } = require("pg");

let DB_URI = process.env.DATABASE_URL;

// if(process.env.NODE_ENV === "test"){
//     DB_URI = "postgresql:///mymovies_test";
// } else {
//     DB_URI = "postgresql:///mymovies";
// }

let db = new Client({
    connectionString: DB_URI,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

module.exports = db;