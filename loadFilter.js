// a LoadPredicate... thing? no idea how this works.

const config = require("./config.json");
const {LOG_COLOR} = require("./things.constants.js");

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

	return true;
};
