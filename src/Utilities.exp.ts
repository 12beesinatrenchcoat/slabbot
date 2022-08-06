/* Functions relating to the EXP system. */

import {ChatInputCommandInteraction, EmbedBuilder, Message, User} from "discord.js";
import {UsersModel} from "./models.js";
import {newUser} from "./Utilities.Db.js";

/**
 * Gets the required Total EXP required to reach a specified level.
 * @param level Level to get EXP required for.
 * @returns Total EXP required to reach the specified level.
 */
export const expNeededForLevel = (level: number): number => level * (2500 + ((level - 1) * 100));

export async function grantExp(user: User, event: Message | ChatInputCommandInteraction) {
	if (!user.bot) {
		const userInDb = await UsersModel.findById(user.id);

		if (!userInDb) {
			newUser(user.id);
			return 1;
		}

		if (!userInDb.lastEventDate) {
			userInDb.lastEventDate = event.createdAt;
		}

		const difference = event.createdAt.valueOf() - userInDb.lastEventDate.valueOf();
		userInDb.lastEventDate = event.createdAt;
		userInDb.exp += Math.min(
			(difference / 2000),
			15,
		);

		if (userInDb.exp >= expNeededForLevel(userInDb.level + 1)) {
			userInDb.level++;
			event.reply({
				content: "ding!",
				embeds: [new EmbedBuilder()
					.setTitle("level up!")
					.setDescription("```glsl\n# YOU ARE NOW LEVEL\n" + generateLargeNumber(userInDb.level, "# ") + "```")],
			});
		}

		await userInDb.save();
	}
}

/**
 * Turns a number into a multi-line string that looks like large numbers of those numbers. Each character is 6 columns x 5 rows.
 * @param number A number.
 * @param prefix Prefix each line.
 * @returns Multi-line string containing numbers.
 */
export function generateLargeNumber(number: number, prefix = ""): string {
	const digits = Array.from(number.toString()).map(Number);
	let output = "";

	for (let row = 0; row < 5; row++) {
		output += prefix;

		for (const digit of digits) {
			output += largeNumbers[digit][row];
		}

		output += "\n";
	}

	return output;
}

/**
 * An array of large numbers. 6 columns x 5 rows.
 */
const largeNumbers: string[][] = [
	[
		"██████ ",
		"██  ██ ",
		"██  ██ ",
		"██  ██ ",
		"██████ ",
	], [
		"████   ",
		"  ██   ",
		"  ██   ",
		"  ██   ",
		"██████ ",
	], [
		"██████ ",
		"    ██ ",
		"██████ ",
		"██     ",
		"██████ ",
	], [
		"██████ ",
		"    ██ ",
		"██████ ",
		"    ██ ",
		"██████ ",
	], [
		"██  ██ ",
		"██  ██ ",
		"██████ ",
		"    ██ ",
		"    ██ ",
	], [
		"██████ ",
		"██     ",
		"██████ ",
		"    ██ ",
		"██████ ",
	], [
		"██████ ",
		"██     ",
		"██████ ",
		"██  ██ ",
		"██████ ",
	], [
		"██████ ",
		"    ██ ",
		"    ██ ",
		"    ██ ",
		"    ██ ",
	], [
		"██████ ",
		"██  ██ ",
		"██████ ",
		"██  ██ ",
		"██████ ",
	], [
		"██████ ",
		"██  ██ ",
		"██████ ",
		"    ██ ",
		"██████ ",
	],
];

