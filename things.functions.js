// misc. things that would be used in more than one thing.

const {MessageEmbed} = require("discord.js");

exports.toBigNumber = function (number, prefix = ["# ", "# ", "# ", "# ", "# "]) {
	/* array number corresponds with number. (bigNumbers[0] is zero)
	   object id corresponds with line number (bigNumbers[0].2 is line 2 of zero.). */
	/* "prefix" should be an array with 5 items. */
	const bigNumbers = [[
		"██████ ",
		"██  ██ ",
		"██  ██ ",
		"██  ██ ",
		"██████ "
	], [
		"████   ",
		"  ██   ",
		"  ██   ",
		"  ██   ",
		"██████ "
	], [
		"██████ ",
		"    ██ ",
		"██████ ",
		"██     ",
		"██████ "
	], [
		"██████ ",
		"    ██ ",
		"██████ ",
		"    ██ ",
		"██████ "
	], [
		"██  ██ ",
		"██  ██ ",
		"██████ ",
		"    ██ ",
		"    ██ "
	], [
		"██████ ",
		"██     ",
		"██████ ",
		"    ██ ",
		"██████ "
	], [
		"██████ ",
		"██     ",
		"██████ ",
		"██  ██ ",
		"██████ "
	], [
		"██████ ",
		"    ██ ",
		"    ██ ",
		"    ██ ",
		"    ██ "
	], [
		"██████ ",
		"██  ██ ",
		"██████ ",
		"██  ██ ",
		"██████ "
	], [
		"██████ ",
		"██  ██ ",
		"██████ ",
		"    ██ ",
		"██████ "
	]];
	// turn number into array of numbers
	const numberDigits = Array.from(String(number)).map(Number);

	let output = "";

	for (let line = 0; line < 5; line++) {
		output += prefix[line];
		for (let digit = 0; digit < numberDigits.length; digit++) {
			output += bigNumbers[numberDigits[digit]][line];
		}

		output += "\n";
	}

	return output;
};

// see also: https://www.desmos.com/calculator/kcrt4evjgg
exports.expNeededForLevel = level => (1024 * (level ** 1.3)) + ((256 * ((level - 1)) / 8) ** 1.8) || 0;

// creating an exp bar. (takes in a number >1 as percentage!)
exports.createExpBar = function (percentage, maxLength) {
	let output = "";
	const fillCount = Math.floor(percentage / 100 * maxLength);

	for (let char = 0; char < maxLength; char++) {
		if (char === 0) {
			output += "[";
		} else if (char === maxLength - 1) {
			output += "]";
		} else if (char < fillCount) {
			output += "|";
		} else {
			output += " ";
		}
	}

	return output;
};

// formatting numbers. here to make code just a bit more concise.
exports.fNum = function (number, decimalPlaces) {
	return number.toLocaleString("en-US", {minimumFractionDigits: decimalPlaces || 0,
		maximumFractionDigits: decimalPlaces || 0});
};

// formatting durations - seconds to a string. elegant answer mostly stolen from https://stackoverflow.com/a/52387803.
// format can be "str" or "obj"
exports.sToDhms = function (seconds, format = "str") {
	const d = Math.floor(seconds / (3600 * 24));
	const h = Math.floor(seconds % (3600 * 24) / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = (seconds % 60).toFixed(2);

	const dStr = d > 0 ? d + "d " : "";
	const hStr = h > 0 || d > 0 ? h + "h " : "";
	const mStr = m > 0 || d > 0 || h > 0 ? m + "m " : "";
	const sStr = s > 0 || d > 0 || h > 0 || m > 0 ? s + "s" : "";

	switch (format) {
		case "obj":
			return {
				d: dStr,
				h: hStr,
				m: mStr,
				s: sStr
			};
		default:
			return dStr + hStr + mStr + sStr;
	}
};

exports.getLongMonth = function (month) {
	// eslint-disable-next-line new-cap
	return Intl.DateTimeFormat("en-US", {month: "long"}).format(month);
};

/**
 * creates a MessageEmbed for response to a command error.
 * @param {Message} message the message that triggered the command.
 * @param {Object} error the error that occured.
 * @param {String} error.title a title for the embed.
 * @param {String} error.description description of the embed.
 * @param {String} error.message message that goes along with the embed.
 * @param {String} [descriptionOverride] override embed description with other text, if needed.
 */
exports.returnError = function (message, error, descriptionOverride = null) {
	const embed = new MessageEmbed()
		.setTitle("error: " + error.title)
		.setDescription(descriptionOverride ?? error.description)
		.setColor("#FF0000");

	return message.reply(error.message, embed);
};

// taken from https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786, which was based on https://en.wikipedia.org/wiki/HSL_and_HSV.
/**
 * takes numbers for hue, saturation, and lightness, converts to rgb.
 * @param {Number} h hue, between 0 and 360.
 * @param {Number} s saturation, between 0 and 1.
 * @param {Number} l lightness, between 0 and 1.
 * @returns {Array} array of numbers [r, g, b].
 */
exports.hslToRgb = function (h, s, l) {
	const c = (1 - Math.abs((2 * l) - 1)) * s;
	const hp = h / 60.0;
	const x = c * (1 - Math.abs((hp % 2) - 1));
	let rgb1;
	if (isNaN(h)) {
		rgb1 = [0, 0, 0];
	} else if (hp <= 1) {
		rgb1 = [c, x, 0];
	} else if (hp <= 2) {
		rgb1 = [x, c, 0];
	} else if (hp <= 3) {
		rgb1 = [0, c, x];
	} else if (hp <= 4) {
		rgb1 = [0, x, c];
	} else if (hp <= 5) {
		rgb1 = [x, 0, c];
	} else if (hp <= 6) {
		rgb1 = [c, 0, x];
	}

	const m = l - (c * 0.5);
	return [
		Math.round(255 * (rgb1[0] + m)),
		Math.round(255 * (rgb1[1] + m)),
		Math.round(255 * (rgb1[2] + m))
	];
};
