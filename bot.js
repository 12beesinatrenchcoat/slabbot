// setting up akairo, the bot, connecting to discord...

const {AkairoClient, CommandHandler, ListenerHandler} = require("discord-akairo");
const {token, owner} = require("./config.json");
const {commandFilter, listenerFilter} = require("./loadFilter.js");

class Client extends AkairoClient {
	constructor() {
		super({
			ownerID: owner
		}, {
			disableMentions: "everyone"
		});

		this.commandHandler = new CommandHandler(this, {
			directory: "./commands/",
			prefix: ["sl ", "slabbot "],
			defaultCooldown: 3000,
			commandUtil: true
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: "./listeners"
		});

		this.commandHandler.on("load", command => {
			console.log("loaded command", "\x1b[33m" + command.id + "\x1b[0m");
		});

		this.commandHandler.loadAll("./commands/", commandFilter);
		this.commandHandler.useListenerHandler(this.listenerHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler
		});

		this.listenerHandler.on("load", listener => {
			console.log("loaded listener", "\x1b[33m" + listener.id + "\x1b[0m");
		});

		this.listenerHandler.loadAll("./listeners/", listenerFilter);
	}

	async login(token) {
		return super.login(token);
	}
}

const client = new Client();

client.on("error", () => {
	console.log("sonmething went wrong... [ = ; x ; = ]");
});

// client.on("message",() => {
//     console.log("message!");
// });

client.login(token);
