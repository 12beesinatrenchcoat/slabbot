// tell a user that a command is on cooldown.
const {Listener} = require("discord-akairo");

class CommandCooldown extends Listener {
	constructor() {
		super("cooldown", {
			emitter: "commandHandler",
			event: "cooldown"
		});
	}

	exec(message, command, remaining) {
		message.reply(`that command (\`${command.aliases[0]}\`) is on cooldown! *(:snowflake:${Math.round(remaining / 10) / 100}s left...)*`)
			// thank you https://stackoverflow.com/a/46918813!
			.then(msg => {
				setTimeout(() => msg.delete(), remaining);
			});
	}
}

module.exports = CommandCooldown;
