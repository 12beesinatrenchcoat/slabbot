// setting up mongoose...
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const db = mongoose.connection;
const {LOG_COLOR} = require("./things.constants.js");
let readyState;

console.log(LOG_COLOR.BG.BLUE, "starting up (connecting to mongodb)...");

mongoose.connect(url, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.catch(error => {
		console.log(LOG_COLOR.BG.RED, "failed to connect to mongodb. 'exp' and 'commandCount' listeners, and 'me' command will not be loaded.\n", error);
	})
	.finally(() => {
		console.log(LOG_COLOR.BG.BLUE, "loading commands and connecting to discord...");
		require("./bot.js"); // this file is the important one (sets up commands!)
		readyState = mongoose.connection.readyState;
	});

db.on("error", () => {
	console.error.bind(console, "connection error:");
});

db.once("open", () => {
	console.log(LOG_COLOR.BG.GREEN, "connected to database! [...]");
});

module.exports = readyState;
