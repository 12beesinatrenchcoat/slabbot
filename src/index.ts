// Imports for loading commands
import fs from "node:fs";
import {fileURLToPath} from "node:url";
import "reflect-metadata"; // Required by tsyringe
import {container} from "tsyringe";
// Discord.js
import {Client, ClientOptions, Collection, Intents} from "discord.js";
import {Command, DJSEvent} from "./Interfaces";
// Database
import mongoose from "mongoose";
const db = mongoose.connection;
// Logger
import logger from "./logger.js";
// Environment variables
import "dotenv/config";

/* Database connecting */
logger.info("connecting to database…");
await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017", {})
	.then(() => {
		logger.info("connected to database!");
	})
	.catch(error => {
		logger.error(error);
	});

db.on("error", error => {
	logger.error(error);
});

class ExtendedClient extends Client {
	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}

	commands: Collection<string, Command>;
}

declare global {
	// eslint-disable-next-line no-var
	var client: ExtendedClient;
}

globalThis.client = new ExtendedClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

/* Loading commands */
client.commands = new Collection();
const commandFiles = fs.readdirSync(fileURLToPath(new URL("./commands", import.meta.url))).filter(file => file.endsWith(".js"));

for await (const file of commandFiles) {
	logger.debug("Loading command file " + file);
	const command = container.resolve<Command>((await import(new URL("./commands/" + file, import.meta.url).href)).default);

	client.commands.set(command.data.name, command);
}

/* Loading events */
const eventFiles = fs.readdirSync(fileURLToPath(new URL("./events", import.meta.url))).filter(file => file.endsWith(".js"));

for await (const file of eventFiles) {
	logger.debug("Loading event watcher file " + file);
	const event = container.resolve<DJSEvent>((await import(new URL("./events/" + file, import.meta.url).href)).default);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.DISCORD_TOKEN)
	.catch(error => {
		logger.error(error);
	});
