import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Command} from "../Interfaces";

const data = new SlashCommandBuilder()
	.setName("decide")
	.setDescription("have slabbot decide between some things for you!")
	/* eslint-disable comma-dangle */
	.addStringOption(option =>
		option.setName("item1")
			.setDescription("the 1st thing.")
			.setRequired(true)
	)
	.addStringOption(option =>
		option.setName("item2")
			.setDescription("the 2nd thing.")
			.setRequired(false)
	)
	.addStringOption(option =>
		option.setName("item3")
			.setDescription("the 3rd thing.")
			.setRequired(false)
	);

for (let i = 4; i <= 25; i++) {
	data.addStringOption(option =>
		option.setName("item" + String(i))
			.setDescription(`the ${i}th thing.`)
			.setRequired(false)
	);
}
/* eslint-enable comma-dangle */

export default class implements Command {
	data = data;
	execute = async (interaction: ChatInputCommandInteraction) => {
		const itemsArray: string[] = [];

		for (let i = 1; i <= 25; i++) {
			const item = interaction.options.getString("item" + String(i), false);
			if (item) {
				itemsArray.push(item);
			}
		}

		const randomNumber = Math.floor(Math.random() * (itemsArray.length));
		const randomItem = itemsArray[randomNumber];

		interaction.reply({
			content: `i choose… \`${randomItem}\`!`,
		});
	};
}
