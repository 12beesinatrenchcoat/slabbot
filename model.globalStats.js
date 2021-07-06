// global stats schema -- currently just command counting.
const mongoose = require("mongoose");
const {Schema} = mongoose;

const globalStatsSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		default: 0
	}
}, {minimize: false});

const statsDb = mongoose.connection.useDb("statsDb");

module.exports = statsDb.model("globalStats", globalStatsSchema);
