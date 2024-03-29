import {ChatInputCommandInteraction, SlashCommandBuilder, Client} from "discord.js";
import {Command} from "../Interfaces";

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName("ping")
		.setDescription("pong!");

	execute = async function (interaction: ChatInputCommandInteraction, client: Client) {
		return interaction.reply({
			content: `pong! ${client.ws.ping}ms to discord…`,
			fetchReply: true,
		})
			.then(() => {
				const createdAt = interaction.createdTimestamp;
				const now = Date.now();
				interaction.editReply(`pong! ${client.ws.ping}ms to discord and ${now - createdAt}ms to response!`);
			});
	};
}
