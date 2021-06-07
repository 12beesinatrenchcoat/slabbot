const {Listener} = require("discord-akairo");

class CommandCooldown extends Listener {
	constructor() {
		super("cooldown", {
			emitter: "commandHandler",
			event: "cooldown"
		});
	}

	exec(message, command, remaining) {
		message.reply(`that command (\`${command.aliases[0]}\`) is on cooldown! *(:snowflake:${Math.round(remaining / 10) / 100}s left...)*`);
	}
}

module.exports = CommandCooldown;
