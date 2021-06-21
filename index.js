// setting up mongoose...
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const db = mongoose.connection;
const {LOG_COLOR} = require("./things.constants.js");
require("./bot.js"); // this file is the important one (sets up commands!)

mongoose.connect(url, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
});
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log(LOG_COLOR.FG.GREEN, "connected to database! [...]");
});
