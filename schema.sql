DROP DATABASE IF EXISTS "mymovies";

CREATE DATABASE "mymovies";

\c "mymovies"


CREATE TABLE users (
username VARCHAR(25) PRIMARY KEY,
password VARCHAR(25) NOT NULL,
created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
                    
CREATE TABLE faves (
movie_id INTEGER NOT NULL,
movie_title TEXT NOT NULL,
username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
PRIMARY KEY (movie_id, username)
);