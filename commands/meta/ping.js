// a classic command that every bot uses. shamelessly stolen from the guide.

const {Command} = require("discord-akairo");
const info = require.main.require("./commandInfo.json");

class PingCommand extends Command {
	constructor() {
		super("ping", {
			aliases: ["ping"],
			category: "meta",
			description: info.ping
		});
	}

	async exec(message) {
		const sent = await message.util.reply(`pong! (${this.client.ws.ping}ms to discord...`);
		const timeDiff = sent.createdAt - message.createdAt;

		return message.util.reply(`pong! (${this.client.ws.ping}ms to discord, ${timeDiff}ms to response)`);
	}
}

module.exports = PingCommand;
