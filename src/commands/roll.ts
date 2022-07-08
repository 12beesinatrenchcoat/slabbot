import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, HexColorString, MessageEmbed} from "discord.js";
import {Command} from "../Interfaces";
import {generateCommandProblemEmbed} from "../Utilities.js";
import {hslToHex} from "@barelyhuman/tocolor";

const regex = /^([0-9]+|)d([0-9]+)$/;

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName("roll")
		.setDescription("roll some dice!")
		/* eslint-disable comma-dangle */
		.addStringOption(option =>
			option.setName("dice")
				.setDescription("dice notation. AdX, where A is the amount of dice, and X for the number of sides.")
				.setRequired(true)
		);
		/* eslint-enable comma-dangle */

	execute = async (interaction: CommandInteraction) => {
		const embeds = [];
		const diceString = interaction.options.getString("dice", true);

		/* Make sure it's valid dice notation or something */
		if (!regex.test(diceString)) {
			return interaction.reply({
				content: "invalid dice",
				embeds: [invalidStringError],
				ephemeral: true,
			});
		}

		let [diceCount, diceSides] = diceString.split("d").map(a => Number(a));
		diceCount = diceCount || 1;

		/* Too many dice */
		if (diceCount > 100) {
			return interaction.reply({
				content: "that's… a lot…",
				embeds: [tooManyDiceError],
				ephemeral: true,
			});
		}

		/* Too many sides */
		if (diceSides > 1000) {
			return interaction.reply({
				content: "how would i even throw this thing.",
				embeds: [tooManySidesError],
				ephemeral: true,
			});
		}

		/* Not enough sides */
		if (diceSides < 2) {
			return interaction.reply({
				content: "_ _",
				embeds: [notEnoughSidesError],
				ephemeral: true,
			});
		}

		await interaction.deferReply();

		/* Rolling the dice! */
		const diceRolls: number[] = [];
		let total = 0;
		const max = diceSides;
		const min = 1;

		const minPossible = diceCount;
		const maxPossible = max * diceCount;

		for (let i = 0; i < diceCount; i++) {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
			const roll = Math.floor((Math.random() * (max - min + 1)) + min);
			diceRolls.push(roll);
			total += roll;
		}

		const percent = (total - minPossible) / (maxPossible - minPossible);

		const color: HexColorString = `#${hslToHex(120 * percent, 90, 60)}`;

		const average = (total / diceCount).toFixed(2);

		embeds.push(new MessageEmbed()
			.setTitle(`rolled ${diceCount} d${diceSides}!`)
			.setDescription("`" + diceRolls.join("` `") + "`")
			.setColor(color)
			.setFooter({
				text: `total: ${total}, average ${average}`,
			})
			.setTimestamp(Date.now()),
		);

		return interaction.editReply({
			content: "may the dice be ever in your favor…",
			embeds,
		});
	};
}

/* Errors */
const invalidStringError = generateCommandProblemEmbed(
	"are these dice?",
	"It doesn't seem you put in valid dice notation — `AdX`, where `A` is the amount of dice, and `X` is the number of sides to the dice. `A` can be omitted if you are rolling only one die.\n"
	+ "Internally, your input is matched against this regex:\n"
	+ "```js\n const regex =" + regex.toString() + "\n```",
	"error",
);

const tooManyDiceError = generateCommandProblemEmbed(
	"too many dice!",
	"Please limit yourself to rolling **at most 100 dice at a time**. Yes, it's a bit arbitrary, but still.",
	"error",
);

const tooManySidesError = generateCommandProblemEmbed(
	"too many sides!",
	"I'm going to be annoying here and limit you to **1000 sides per die**.",
	"error",
);

const notEnoughSidesError = generateCommandProblemEmbed(
	"not enough sides!",
	"Dice have to have at least 2 sides.",
	"error",
);
