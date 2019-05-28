let mongoose = require("mongoose");

var moviesSchema = new mongoose.Schema({
    image: String,
    description: String
});

module.exports = mongoose.model("Movies", moviesSchema);