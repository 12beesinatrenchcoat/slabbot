// a LoadPredicate... thing? no idea how this works.

const config = require("./config.json");
const {LOG_COLOR} = require("./things.constants.js");
const mongoose = require("mongoose");
require("./index.js");

exports.commandFilter = filepath => {
	// console.log(filepath);
	if (!filepath.endsWith(".js")) {
		return false;
	}

	if (filepath.endsWith("osu.js")) {
		if (config.osu) {
			return true;
		}

		console.log(LOG_COLOR.FG.RED, "no 'osu' property detected in config.json; osu command will not be loaded.");
		return false;
	}

	if (filepath.endsWith("me.js")) {
		return Boolean(mongoose.connection.readyState);
	}

	return true;
};

exports.listenerFilter = filepath => {
	// console.log(filepath);
	if (!filepath.endsWith(".js")) {
		return false;
	}

	if (filepath.endsWith("exp.js") || filepath.endsWith("commandCount.js")) {
		// readyState is 0 if disconnected, 1 if connected.
		return Boolean(mongoose.connection.readyState);
	}

	return true;
};
