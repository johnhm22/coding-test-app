# coding-test-app

### Motivation  
This is a small app developed as an exercise set by a tech company that was interested in my profile.  Clearly, their objective was to get an understanding of my coding skills.  Overall, it was an enjoyable test and a useful learning opportunity.

### What does the app do?  
Simply put, it allows you to enter a search term for movies and see the results provided by an API. You can then click on the movie title to see further details. The app offers the possibility of creating an account and so allowing the user to save a list of favourite movies; these can be seen by selecting the “faves” link in the navbar. If you are not logged in and click on the faves link in the navbar, or try to add a movie to the favourites list, the app returns you to the login page.

That’s it!

### Tech framework  
This is a backend app in the sense that the html pages are rendered by the backend server as opposed to a single page app approach using React or Angular. As you click from one page to another, each html is sent from the server.

In terms of specific technologies, the app uses:
* TypeScript
* JavaScript
* Express
* Express Session
* Nunjucks as a templating engine for JavaScript
* HTML
* Bootstrap 4
* PostgreSQL 12 as a database

### API
The movie API was from:
https://www.themoviedb.org/documentation/api

### Downloading the app files
Create a folder on your own computer, ensuring it's not already a git repository. There is a green button at the top right of this repository called 'Code' which you gives you the option to clone, download a zip file, or open with GitHub desktop. Choosing 'clone', fetches everything and puts it in your folder.  
If you want to clone, copy the link and then run this command:  
'git clone https://github.com/johnhm22/coding-test-app '.  
You do, of course, have to create your own .env file to contain the secret key required by express session and the API key, which you get from the API provider.

### Setting up the database
You'll need to install the database PostgreSQL and then set up the tables. There is a script included here called schema.sql. It creates the database called mymovies; first dropping it if it already exists, creating it from new and then creating tables. In the console, navigate to the same directory as the file schema.sql and then run the command: 'psql < schema.sql'.

### Installing dependencies
In the console, run 'npm init' in the root directory.

### Starting the server and running tests
This I did by running 'nodemon server.js' in the /dist directory which contains all the js files. I also ran jest from here.

### Difficulties and challenges
Prior to starting this development, I hadn’t used TypeScript or Nunjucks before, although, with regard to the latter, I was familiar with Jinja which is very similar. 

The basics of TypeScript I picked up by following this tutorial which is very good:  
https://www.youtube.com/watch?v=gp5H0Vw39yw&list=LL&index=3&t=731s

I struggled with customising the navbar links according to whether the user was logged in. Express Session was used to track if the user was logged in or not. The navbar was put into the base.html which was a base template for each html page. There was no specific route to call the base.html, and so the navbar, so adding a conditional in a route that calls the file was not possible. I will work this out.


### Things to do
* Give names to the callbacks in the routes in order to identify exactly what they are doing
* Create separate files for the routes rather than put them all in app.ts
* Create object models for the sql queries so the routes call static methods on the model(s)
* Add password encryption. I didn’t add this as it was a simple demo app, although it could be done quite easily using bcrypt.
* Learn more about TypeScript. I managed, but was unsure if the app could be run from the ./src directory where the ts files were located. It didn’t seem straight forward and in the end I stuck with what I knew and ran it from the ./dist folder where the js files were.
* Work out how to customise the links on the navbar according to whether the user is logged in; it should be easy to do.


### Credits
Finally, I have been helped tremendously in learning web development and coding by the lectures of Colt Steele in his Udemy Web Development and JavaScript courses:  
https://www.udemy.com/course/the-web-developer-bootcamp  
https://www.udemy.com/course/javascript-beginners-complete-tutorial

and the Software Engineer Boot Camp course from Springboard, also by Colt:  
https://www.springboard.com/courses/software-engineering-career-track/
