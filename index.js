// setting up mongoose...
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const db = mongoose.connection;
require("./bot.js");

mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("connected to database! [...]");  
});
