// "i used to roll the dice" - coldplay man

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");
const info = require.main.require("./commandInfo.json");
const {returnError, hslToRgb} = require.main.require("./things.functions.js");

// handled user(?) errors.
const e = {
	missingArguments: {
		message: "roll... what? [= + x + =];",
		title: "no dice.",
		description: "you need to specify dice to roll. say, `d6` for a six-sided die. add a number before that if you want to roll multiple (e.g. `3d20` will roll three 20-sided dice.)"
	},
	malformedArguments: {
		message: "i don't understand... [ > x < ]",
		title: "malformed arguments.",
		description: 'one or more of the arguments you gave aren\'t right. they must be in the format of `xdy`, where `x` is the number of dice, `y` is the sides of the dice, and `d` is the letter "d". \n for the nerds, here\'s some regex:\n```\n/^([0-9]+|)d[0-9]+/\n```'
	},
	outputTooLong: {
		message: "that's a bit... much... [=o x o=];",
		title: "output too long",
		description: "the output is too long (bots also have character limits!) please roll less dice."
	},
	generic: {
		message: "something went wrong...! [=o x o=];",
		title: "generic catch-all error",
		description: "if you're seeing this, something went wrong while sending the message. maybe it's too long, in which case, try rolling less dice...?"
	}
};

class DiceRoll extends Command {
	constructor() {
		super("dice", {
			aliases: ["dice", "roll"],
			category: "utilities",
			description: info.dice,
			args: [
				{
					id: "dice",
					match: "separate"
				}
			]
		});
	}

	exec(message, args) {
		if (!args.dice) {
			return returnError(message, e.missingArguments);
		}

		const results = [];
		let diceCount = 0; // total amount of dice being rolled / lowest number rollable
		let diceMax = 0; // highest possible number that can be rolled
		let totalRoll = 0;

		// for checking if the argument is valid
		const regex = /^([0-9]+|)d([0-9]+)/;

		// rolling the dice
		for (const die of args.dice) {
			// does it fit the regex?
			if (!regex.test(die)) {
				return returnError(message, e.malformedArguments);
			}

			const values = die.split("d");
			// values[0] is number of dice
			// values[1] is sides to the dice
			values[0] = parseInt(values[0]) || 1;
			values[1] = parseInt(values[1]);

			diceMax += values[0] * values[1];

			// counting number of die...
			diceCount += values[0];

			const min = 1;

			const diceResults = [];

			// for each dice...
			for (let i = 0; i < (values[0] || 1); i++) {
				diceResults.push(Math.floor((Math.random() * (values[1] - min + 1)) + min));
			}

			results.push({
				dice: die,
				rolls: diceResults
			});
		}

		// formatting results

		const embed = new MessageEmbed()
			.setTitle("rolled " +
                (diceCount === 1 ? "a die!" : diceCount + " dice!") + " :game_die:");

		for (const result of results) {
			const rolls = "`" + result.rolls.join("` `") + "`";
			const total = result.rolls.reduce((a, b) => a + b);

			totalRoll += total;

			const body = rolls + " (total " + total + ")";

			if (body.length > 1024) {
				return returnError(message, e.outputTooLong);
			}

			embed.addField(
				result.dice,
				body,
				true
			);
		}

		// coloring the embed based on the total roll
		switch (totalRoll) {
			case diceMax:
				embed.setColor("GREEN");
				break;
			case diceCount:
				embed.setColor("RED");
				break;
			default: {
				const h = (((totalRoll - diceCount) / (diceMax - diceCount)) * 100) + 10; // min 10, max 110
				const color = (hslToRgb(h, 0.75, 0.55));
				embed.setColor(color);
			}
		}

		return message.reply("the dice hath been rolled!", embed)
			.catch(() => {
				return returnError(message, e.generic);
			});
	}
}

module.exports = DiceRoll;
