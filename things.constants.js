// some constant values.

exports.SLABBOT_ORANGE = "#F69321";

exports.LOG_COLOR = {
	FG: {
		RED: "\x1b[31m%s\x1b[0m",
		GREEN: "\x1b[32m%s\x1b[0m",
		YELLOW: "\x1b[33m%s\x1b[0m",
		BLUE: "\x1b[34m%s\x1b[0m"
	},
	BG: { // all use black fg
		RED: "\x1b[30;41m%s\x1b[0m",
		GREEN: "\x1b[30;42m%s\x1b[0m",
		YELLOW: "\x1b[30;43m%s\x1b[0m",
		BLUE: "\x1b[30;44m%s\x1b[0m"

	}
};
