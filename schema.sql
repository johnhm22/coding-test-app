DROP DATABASE IF EXISTS "mymovies";

CREATE DATABASE "mymovies";

\c "mymovies"


CREATE TABLE users (
username VARCHAR(25) PRIMARY KEY NOT NULL,
password VARCHAR(25) NOT NULL,
created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
                    
CREATE TABLE faves (movie_id INTEGER PRIMARY KEY,
movie_title TEXT,
                    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);