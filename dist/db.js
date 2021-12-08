var Client = require("pg").Client;
var DB_URI;
if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///mymovies_test";
}
else {
    DB_URI = "postgresql:///mymovies";
}
var db = new Client({
    connectionString: DB_URI
});
db.connect();
module.exports = db;
