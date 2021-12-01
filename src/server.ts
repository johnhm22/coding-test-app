export{}

const app = require("./app")

const PORT = +process.env.PORT

app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Server listening on http://localhost:${PORT}`);
=======
    console.log(`Server listening on ${PORT}`);
>>>>>>> heroku_faves
})