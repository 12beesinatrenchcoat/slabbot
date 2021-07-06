// give slabbot some things, and they'll choose one.
const {Command} = require("discord-akairo");
const info = require.main.require("./commandInfo.json");

class Decide extends Command {
	constructor() {
		super("decide", {
			aliases: ["decide", "choose"],
			category: "utilities",
			description: info.decide,
			args: [
				{
					id: "items",
					match: "content"
				}
			]
		});
	}

	exec(message, args) {
		if (!args.items) {
			return NoItems.reply(message);
		}

		const items = args.items.split(",");
		const picked = items[Math.floor(Math.random() * items.length)];
		return message.reply(`I choose ${picked.trim()}!`);
	}
}

module.exports = Decide;

// errors
const CommandError = require.main.require("./things.commandError.js");

const NoItems = new CommandError({
	embedTitle: "no items.",
	embedDescription: "you need to specify something to choose between...",
	messageText: "you gave me nothing to work with here..."
});
