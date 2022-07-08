// Imports for loading commands
import fs from "node:fs";
import {fileURLToPath} from "node:url";
import "reflect-metadata"; // Required by tsyringe
import {container} from "tsyringe";
// Discord.js
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import {Command} from "../Interfaces";
// Environment variables
import "dotenv/config";
// Logger
import pino from "pino";
const logger = pino({
	transport: {
		target: "pino-pretty",
	},
});

const args = process.argv.slice(2);

if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
	logger.fatal("You're missing some Discord things.");
	process.exit(1);
}

const commands = [];
const commandFiles = fs.readdirSync(fileURLToPath(new URL("./commands", import.meta.url))).filter(file => file.endsWith(".js"));

for await (const file of commandFiles) {
	logger.debug("Loading command file " + file);
	const command = container.resolve<Command>((await import(new URL("./commands/" + file, import.meta.url).href)).default);

	commands.push(command.data.toJSON());
}

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);

let countToExit = 0;
let currentCount = 0;

if (args.includes.length > 0) {
	if (args.includes("guild")) {
		countToExit++;
		if (!process.env.GUILD_ID) {
			logger.fatal("You're missing a guild ID.");
			process.exit(1);
		}

		rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
			.then(() => {
				logger.info("Successfully registered application commands in guild.");
				currentCount++;
				tryToExit();
			})
			.catch(logger.error);
	}

	if (args.includes("global")) {
		countToExit++;
		rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands})
			.then(() => {
				logger.info("Successfully registered application commands globally.");
				currentCount++;
				tryToExit();
			})
			.catch(logger.error);
	}

	if (!args.includes("guild") && !args.includes("global")) {
		logger.fatal("Include 'guild' or 'global' as arguments.");
		process.exit(1);
	}
}

function tryToExit() {
	if (countToExit === currentCount) {
		process.exit(0);
	}
}
