const {Listener} = require("discord-akairo");

class ReadyListener extends Listener {
	constructor() {
		super("ready", {
			emitter: "client",
			event: "ready"
		});
	}

	exec() {
		console.log("slabbot is ready! [= ' x ' =]");
	}
}

module.exports = ReadyListener;
