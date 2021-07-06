// whenever a ready event is emitted, print a thing to console. that's it.
const {Listener} = require("discord-akairo");
const {LOG_COLOR} = require.main.require("./things.constants.js");
class ReadyListener extends Listener {
	constructor() {
		super("ready", {
			emitter: "client",
			event: "ready"
		});
	}

	exec() {
		console.log(LOG_COLOR.BG.GREEN, "slabbot is ready! [= ' x ' =]");
	}
}

module.exports = ReadyListener;
