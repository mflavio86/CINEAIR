let express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    request = require("request"),
    bodyParser = require("body-parser"),
    methodOverride = require('method-override'),
    Movies = require("./models/movies");


mongoose.connect("mongodb://localhost/db_cineAir", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



app.get("/", function(req, res) {
    Movies.find({}, function(err, movies) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(movies);

            res.render("cine", { movies: movies });
        }
    });
});


app.get("/new", function(req, res) {
    res.render("new");
});

app.post("/new", function(req, res) {
    let query = req.body.search;

    let url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;

    request(url, function(error, response, body) {
        let resp = JSON.parse(response.body);
        if (resp.Response === "False") {

            return res.redirect("/");
        }
        else {
            if (!error && response.statusCode == 200) {
                let resultBody = JSON.parse(body);
                res.render("results", { resultBody: resultBody });
            }
        }
    });
});
app.post("/cine", function(req, res) {

    Movies.create({
        image: req.body.posterURL
    }, function(err, movie) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});

//Destroy Route
app.delete("/", function(req, res) {

    if (req.body.del == "Delete") {
        Movies.deleteMany({}, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect("/");
            }
        });
    }
    else {
        Movies.findOneAndDelete({ _id: req.body.movieID }, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect("/");
            }
        });
    }

});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started...");
});
