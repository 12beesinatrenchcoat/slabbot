// AAAAAAHHHHHH I NEEEEED A MEDIIC BAAAAG

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");
const info = require.main.require("./commandInfo.json");

class SlabbotHelp extends Command {
	constructor() {
		super("help", {
			aliases: ["help"],
			category: "meta",
			description: info.help,
			args: [
				{
					id: "command",
					type: "commandAlias"
				}
			]
		});
	}

	exec(message, {command}) {
		if (!command) {
			const embed = new MessageEmbed()
				.setTitle("a list of commands")
				.setDescription("a list of things i can do. [ = ' x ' = ]\nuse `sl help <command> for more information on each command.");
			for (const category of this.handler.categories.values()) {
				embed.addField(
					`${category}`,
					`${category
						.filter(command => command.aliases.length > 0)
						.map(command => `\`${command.aliases[0]}\``)
						.join(" ")
					}`
				);
			}

			return message.reply("here's some information:", embed);
		}

		const embed = new MessageEmbed()
			.setTitle(command.category + " > `" + command.aliases[0] + "`")
			.setDescription(command.description.content)
			.addField("usage", command.description.usage);
		return message.channel.send(`in response to: <@${message.author.id}>`, embed);
	}
}

module.exports = SlabbotHelp;
