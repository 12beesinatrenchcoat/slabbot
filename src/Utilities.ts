/* Functions reused in places */

import {EmbedBuilder} from "discord.js";
import {colors} from "./Constants.js";
import logger from "./logger.js";

const msInSec = 1000;
const msInMin = 1000 * 60;
const msInHor = 1000 * 60 * 60; // "hor" instead of "hr" to make things line up >_<
const msInDay = 1000 * 60 * 60 * 24;
/**
 * Converts milliseconds to duration.
 * @param asObject - Whether to return as an object {d, h, m, s} instead of a string
 */
export function msToDuration(ms: number, asObject = false): object | string {
	const units = {
		d: ms > msInDay ? String(Math.floor(ms / msInDay)) + "d " : "",
		h: ms > msInHor ? String(Math.floor(ms % msInDay / msInHor)) + "h " : "",
		m: ms > msInMin ? String(Math.floor(ms % msInHor / msInMin)) + "m " : "",
		s: ms > msInSec ? (ms % msInMin / msInSec).toFixed(3) + "s" : "",
	};

	return asObject
		? units
		: units.d + units.h + units.m + units.s;
}

/** Creates a slabbot problem embed. */
export function generateCommandProblemEmbed(title: string, description: string, level: "error" | "warning") {
	let color;

	switch (level) {
		case "warning":
			color = colors.orange;
			break;

		default:
			color = colors.red;
			break;
	}

	return new EmbedBuilder()
		.setTitle(level + ": " + title)
		.setDescription(description)
		.setColor(color)
		.setFooter({
			text: "If this shouldn't happen, please file an issue on GitHub! https://github.com/12beesinatrenchcoat/slabbot/issues",
		});
}

/** Creates a text progress bar [||   ]. Percentage in [0, 1]. */
export function generateProgressBar(percentage: number, length: number) {
	if (percentage < 0) {
		logger.error("Percentage out of bounds. Value must be positive.");
		return null;
	}

	if (length <= 3) {
		logger.error("Length of progress bar not long enough (minimum 4).");
		return null;
	}

	let output = "[";

	const fillCount = Math.min(Math.floor(percentage * (length - 2)), length - 2);
	output += "|".repeat(fillCount);
	output += " ".repeat((length - 2) - fillCount);

	output += "]";

	if (output.length !== length) {
		logger.warn("Length of progress bar isn't the same as the input length.");
	}

	return output;
}

export const formatNum = (number: number, decimals = 0): string => new Intl.NumberFormat("en-US", {minimumFractionDigits: decimals, maximumFractionDigits: decimals}).format(number);
