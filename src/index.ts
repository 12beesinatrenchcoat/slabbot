import {Client, Intents} from "discord.js";
import {token} from "../config.json";

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once("ready", () => {
	console.log("slabbot is ready! [='x'=]");
});

// login to Discord with your app's token
client.login(token);

