import {existsSync, writeFileSync} from "fs";
import {input, confirm, password} from "@inquirer/prompts";

const DISCORD_URL = "https://discord.com/developers/applications";
const OSU_URL = "https://osu.ppy.sh/home/account/edit#oauth";

if (existsSync("./.env")) {
	if (
		!await confirm({
			message: "It looks like a .env already exists. Do you want to create a new one?",
			default: false,
		})
	) {
		process.exit();
	}
}

console.log("Discord Keys - " + DISCORD_URL);
const DISCORD_TOKEN = await password({
	message: "Discord Bot Token (required):",
	mask: true,
	// I don't know exactly what a Discord token looks like, but this should be fine.
	validate(token) {
		return (token.length >= 50) || "That doesn't look like a valid token.";
	},
});

const CLIENT_ID = await input({
	message: "Discord Application ID (required):",
	validate(id) {
		return (id.length >= 17 && id.length <= 20) || "That doesn't seem like a valid client ID.";
	},
});

const GUILD_ID = await input({
	message: "Guild ID for testing commands:",
});

console.log("MongoDB Keys (well, key)");
const MONGO_URL = await input({
	message: "URL of MongoDB to connect to:",
	default: "mongodb://127.0.0.1:27017",
});

console.log("osu! Keys - " + OSU_URL);
const OSU_ID = await input({
	message: "osu!api Client ID:",
	validate(id) {
		return (!isNaN(id) || !id) || "That doesn't look like a valid client ID.";
	},
});
const OSU_SECRET = await password({
	message: "osu!api Client Secret:",
	mask: true,
});

const output = `
# Discord (https://discord.com/developers/applications)
DISCORD_TOKEN=${DISCORD_TOKEN}
CLIENT_ID=${CLIENT_ID}
GUILD_ID=${GUILD_ID}

# MongoDB
MONGO_URL=${MONGO_URL}

# osu! (https://osu.ppy.sh/home/account/edit#oauth)
OSU_ID=${OSU_ID}
OSU_SECRET=${OSU_SECRET}
`;

writeFileSync("./.env", output);

console.log("Wrote new .env!");
