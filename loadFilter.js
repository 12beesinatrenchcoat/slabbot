// a LoadPredicate... thing? no idea how this works.

const config = require("./config.json");

exports.commandFilter = filepath => {
	// console.log(filepath);
	if (!filepath.endsWith(".js")) {
		return false;
	}

	if (filepath.endsWith("osu.js")) {
		if (config.osu) {
			return true;
		}

		console.log("no 'osu' property detected in config.json; osu command will not be loaded.");
		return false;
	}

	return true;
};
