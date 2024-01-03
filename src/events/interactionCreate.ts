import {ChatInputCommandInteraction, Snowflake} from "discord.js";
import {Command, DJSEvent} from "../Interfaces.js";
import logger from "../logger.js";
import {CommandUsageModel, UsersModel} from "../models.js";
import {newUser} from "../Utilities.Db.js";
import {grantExp} from "../Utilities.exp.js";
import {generateCommandProblemEmbed} from "../Utilities.js";
import mongoose from "mongoose";

// Object of when user last used any command.
const lastUseTimes: {[key: Snowflake]: number | undefined} = {};
const cooldownLength = 5000; // Global cooldown in milliseconds.

// Object of when any user last used a specific command.
const lastCommandUseTimes: {[key: string]: {[key: Snowflake]: number | undefined}} = {};

export default class implements DJSEvent {
	name = "interactionCreate";
	once = false;

	execute = async function (interaction: ChatInputCommandInteraction) {
		if (!interaction.isCommand()) {
			return;
		}

		const command: Command | undefined = client.commands?.get(interaction.commandName);

		if (!command) {
			return;
		}

		// Check command cooldown.
		if (command.cooldown) {
			if (lastCommandUseTimes[command.data.name]) {
				const lastCommandUseTime = lastCommandUseTimes[command.data.name][interaction.user.id];
				if (lastCommandUseTime && lastCommandUseTime + command.cooldown > interaction.createdTimestamp) {
					interaction.reply({
						content: "chill out! [>_<]",
						embeds: [generateCommandProblemEmbed(
							"this command is on cooldown!",
							`Some commands have longer cooldowns, due to querying other services, or due to processing power usage, or whenever I feel like it. This command in particular has a ${(command.cooldown / 1000).toFixed(1)}s cooldown. **The command's cooldown ends in ${((command.cooldown - (interaction.createdTimestamp - lastCommandUseTime)) / 1000).toFixed(1)}s.**`,
							"error",
						)],
						ephemeral: true,
					});
					return;
				}
			} else {
				lastCommandUseTimes[command.data.name] = {};
			}

			// Check global cooldown.
			const lastUseTime = lastUseTimes[interaction.user.id];
			if (lastUseTime && lastUseTime + cooldownLength > interaction.createdTimestamp) {
				console.log("on cooldown!");
				interaction.reply({
					content: "chill out! [>_<]",
					embeds: [generateCommandProblemEmbed(
						"you're on cooldown!",
						`To keep the bot from overloading, every user has a cooldown on how often they can send a command — once every ${(cooldownLength / 1000).toFixed(1)}s, to be exact. **Your cooldown ends in ${((cooldownLength - (interaction.createdTimestamp - lastUseTime)) / 1000).toFixed(1)}s.**`,
						"error",
					)],
					ephemeral: true,
				});
				return;
			}
		}

		try {
			// Run the command…
			command.execute(interaction, client);

			if (mongoose.connection.readyState === 1) {
				// Database name…
				const subcommand = interaction.options.getSubcommand(false) ?? "";
				const commandNameInDb = (command.data.name + " " + subcommand).trim();

				// Global command usage.
				const commandUsage = await CommandUsageModel.findById(commandNameInDb);
				if (commandUsage) {
					const {value} = commandUsage;
					commandUsage.set("value", value + 1);
					commandUsage.save();
				} else {
					const usage = new CommandUsageModel({
						_id: commandNameInDb,
						value: 1,
					});
					await usage.save();
					logger.debug(`Added command ${commandNameInDb} to usage database.`);
				}

				// User command usage.
				const slabbotUser = await UsersModel.findById(interaction.user.id);
				if (slabbotUser && slabbotUser.commandUsage) {
					const {commandUsage} = slabbotUser;
					const commandUsageTimes = commandUsage.get(commandNameInDb);

					if (commandUsageTimes) {
						commandUsage.set(commandNameInDb, commandUsageTimes + 1);
					} else {
						commandUsage.set(commandNameInDb, 1);
					}

					slabbotUser.save();
				} else {
					newUser(interaction.user.id);
				}

				grantExp(interaction.user, interaction);
				lastUseTimes[interaction.user.id] = interaction.createdTimestamp;
			} else {
				logger.trace("no database, skipping stats");
			}

			if (command.cooldown) {
				lastCommandUseTimes[command.data.name][interaction.user.id] = interaction.createdTimestamp;
			}
		} catch (error) {
			logger.error(error);
			await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
		}
	};
}
