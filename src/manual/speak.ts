/* Speak as the Discord bot, I guess. */
import {ChannelType, Client, GatewayIntentBits, TextChannel} from "discord.js";
import "dotenv/config";
import * as readline from "readline";
import {stdin as input, stdout as output} from "process";
// Logger
import pino from "pino";
const logger = pino({
	transport: {
		target: "pino-pretty",
	},
});
// Args
const args = process.argv.slice(2);

if (!args || args.length !== 1) {
	logger.fatal("There must be one argument: the Channel ID.");
	process.exit(1);
}

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});

client.login(process.env.DISCORD_TOKEN);

let channel: TextChannel;

logger.info(args);

client.once("ready", () => {
	logger.info("Logged in!");
	client.channels.fetch(args[0])
		.then(fetchedChannel => {
			if (!fetchedChannel) {
				logger.fatal("Failed to fetch channel.");
				process.exit(1);
			}

			if (fetchedChannel.type !== ChannelType.GuildText) {
				logger.fatal("Got a channel, but it isn't a text channel.");
				process.exit(1);
			}

			console.log(fetchedChannel);

			channel = fetchedChannel as TextChannel;
			logger.info(`Fetched channel #${channel.name}!`);
		})
		.catch(error => logger.error(error));
});

const rl = readline.createInterface({input, output});
rl.prompt();

rl.on("line", input => {
	logger.info(`Sending message "${input}"`);
	channel.send(input)
		.then(() => {
			logger.info(`Successfully sent message "${input}"!`);
		})
		.catch(error => logger.error(error));
});

rl.on("close", () => {
	logger.info("Logging out…");
	client.destroy();
	logger.info("bye");
	process.exit(0);
});
