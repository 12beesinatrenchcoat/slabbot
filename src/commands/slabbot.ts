import {SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction, GuildMember, User} from "discord.js";
import {Command} from "../Interfaces";
import {colors} from "../Constants.js";
import logger from "../logger.js";
import {formatNum, generateCommandProblemEmbed, generateProgressBar, msToDuration} from "../Utilities.js";
/* For the exp system / slabbot / user */
import {newUser} from "../Utilities.Db.js";
import {CommandUsageModel, SlabbotCommand, SlabbotUser, UsersModel} from "../models.js";
import {expNeededForLevel, generateLargeNumber} from "../Utilities.exp.js";
import mongoose from "mongoose";

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName("slabbot")
		.setDescription("commands related to slabbot.")
		/* eslint-disable comma-dangle */
		.addSubcommand(subcommand =>
			subcommand.setName("about")
				.setDescription("get some information about slabbot.")
		)
		.addSubcommand(subcommand =>
			subcommand.setName("profile")
				.setDescription("get information about a user (xp, most used commands, etc.)")
				.addUserOption(option =>
					option.setName("user")
						.setDescription("the user to fetch the profile of. leave blank for yourself.")
				)
		);
		/* eslint-enable comma-dangle */

	execute = async function (interaction: ChatInputCommandInteraction, client: Client) {
		const subcommand = interaction.options.getSubcommand();

		/* /slabbot about */
		if (subcommand === "about") {
			if (!client.user || !client.uptime) {
				return logger.error("client.user or client.uptime is null… which really shouldn't happen.");
			}

			const slabbotStats = await getSlabbotStats();

			const embed = new EmbedBuilder()
				.setColor(colors.orange)
				.setTitle("[= ^ x ^ =] hello!")
				.setDescription(
					"Hello! I'm slabbot (<@" + client.user.id + ">)!\n"
					+ "I was created by @12beesinatrenchcoat (<@231899170716385280>).\n"
					+ "You can find my source code [here](https://github.com/12beesinatrenchcoat/slabbot).",
				)
			// TODO: Replace this image.
				.setThumbnail("https://raw.githubusercontent.com/AndyThePie/slabbot/master/images/slabbot-icon.png")
				.addFields({
					name: "Uptime",
					value: msToDuration(client.uptime) as string,
					inline: true,
				});

			if (slabbotStats) {
				embed.addFields({
					name: "Commands Run",
					value: slabbotStats.commandsRun,
					inline: true,
				}, {
					name: "Most Used Commands",
					value: slabbotStats.mostUsedCommands,
					inline: false,
				});
			}

			return interaction.reply({
				content: "oh hi! [= ^ x ^ =]",
				embeds: [embed],
			});
		}

		/* /slabbot profile */
		if (subcommand === "profile") {
			if (mongoose.connection.readyState !== 1) {
				logger.trace("no database, no stats");
				return interaction.reply({
					content: "database missing…",
					embeds: [
						generateCommandProblemEmbed(
							"database not connected",
							"there's no database connected, and therefore no stats to get. contact the person running the bot.",
							"error",
						),
					],
				});
			}

			let member: GuildMember | null = null;
			let user: User;

			// In server or in DMs
			if (interaction.inGuild()) {
				member = interaction.options.getMember("user") as GuildMember || interaction.member;
				user = member.user;
			} else {
				user = interaction.options.getUser("user", false) || interaction.user;
			}

			if (!user) {
				return false;
			}

			const {id} = user;

			if (user.bot) {
				return interaction.reply({
					content: "nah, i don't do bots",
					embeds: [botProfileError],
					ephemeral: true,
				});
			}

			await interaction.deferReply();

			let databaseUser = await UsersModel.findById(id) as SlabbotUser;

			if (!databaseUser) {
				databaseUser = await newUser(id);
			}

			const {exp = 0,
				level = 0,
				commandUsage = new Map<string, number>(),
				stats = new Map<string, number>(), // TODO: Do something with this?
			} = databaseUser;

			let description = "";

			if (member?.nickname) {
				description += "also known as `" + member.nickname + "`\n";
			}

			description += levelProgress(level, exp);

			const embed = new EmbedBuilder()
				.setTitle(user.tag.replace("#0", ""))
				.setDescription(description)
				.setThumbnail(user.avatarURL() || user.defaultAvatarURL)
				.setTimestamp(new Date());

			if ([...commandUsage.entries()].length > 0) {
				const mostUsedCommand = [...commandUsage.entries()].reduce((a, b) => b[1] > a[1] ? b : a);
				const totalCommands = [...commandUsage.values()].reduce((a, b) => a + b);
				embed.addFields({
					name: "Commands Run",
					value: `${totalCommands} (mostly /${mostUsedCommand[0]}, ${mostUsedCommand[1]}x)`,
					inline: true,
				});
			}

			return interaction.editReply({
				content: "here you go!",
				embeds: [embed],
			});
		}
	};
}

/**
 * Turns level and exp numbers into Discord text.
 * @param level The user's current level.
 * @param exp The user's current exp.
 * @returns String to be used as the description in the embed.
 */
function levelProgress(level = 0, exp = 0): string {
	const expForCurrentLevel = expNeededForLevel(level);
	const expForNextLevel = expNeededForLevel(level + 1);
	const expToNextLevel = expForNextLevel - exp;
	const percent = (exp - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel);

	let output = "```glsl\n# LEVEL\n";
	output += generateLargeNumber(level, "# ");
	output += generateProgressBar(percent, 20) + " ";
	output += `${(percent * 100).toFixed(2)}%`;
	output += "\n" + exp.toFixed(2) + " exp";
	output += "\n" + expToNextLevel.toFixed(2) + " exp to level " + String(level + 1);

	output += "\n```";

	return output;
}

const botProfileError = generateCommandProblemEmbed(
	"slabbot does not keep track of bots!",
	"See title.",
	"error",
);

async function getSlabbotStats(): Promise<{commandsRun: string, mostUsedCommands: string} | null> {
	if (mongoose.connection.readyState !== 1) {
		logger.trace("no database, no stats");
		return null;
	}

	const commandUsage = await CommandUsageModel.find() as SlabbotCommand[];
	if (!commandUsage) {
		logger.error("no commandUsage???");
		return null;
	}

	const totalCommandsUsed = commandUsage.reduce((total, i) => total + i.value, 0);
	const mostUsedCommands = commandUsage.sort((a, b) => b.value - a.value);
	let mostUsedCommandsString = "";
	for (let i = 0; i < 5; i++) {
		if (mostUsedCommands[i]) {
			mostUsedCommandsString += `${i + 1}. /${mostUsedCommands[i]._id} (used ${formatNum(mostUsedCommands[i].value)} times)`;
			mostUsedCommandsString += "\n";
		} else {
			break;
		}
	}

	return {
		commandsRun: formatNum(totalCommandsUsed) || "None yet…",
		mostUsedCommands: mostUsedCommandsString || "Nothing yet…",
	};
}
