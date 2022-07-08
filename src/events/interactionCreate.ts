import {CommandInteraction} from "discord.js";
import {Command, DJSEvent} from "../Interfaces.js";
import logger from "../logger.js";
import {CommandUsageModel, UsersModel} from "../models.js";
import {newUser} from "../Utilities.Db.js";
import {grantExp} from "../Utilities.exp.js";

export default class implements DJSEvent {
	name = "interactionCreate";
	once = false;
	execute = async function (interaction: CommandInteraction) {
		if (!interaction.isCommand()) {
			return;
		}

		const command: Command | undefined = client.commands?.get(interaction.commandName);

		if (!command) {
			return;
		}

		try {
			// Run the command…
			command.execute(interaction, client);

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
		} catch (error) {
			logger.error(error);
			await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
		}
	};
}
