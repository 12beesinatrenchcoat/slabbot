const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bot = require("./bot.js");
const url = "mongodb://localhost:27017"
const db = mongoose.connection;

mongoose.connect(url, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database! [|||]")
});
