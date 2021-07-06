// about slabbot.
const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");

const info = require.main.require("./commandInfo.json");
const statsModel = require.main.require("./model.globalStats.js");
const {sToDhms} = require.main.require("./things.functions.js");
const {SLABBOT_ORANGE} = require.main.require("./things.constants.js");

// all the git stuff.
const {execSync} = require("child_process");
const git = {};
git.branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
git.commitCount = execSync("git rev-list --count " + git.branch).toString().trim();
git.currentCommit = execSync("git rev-parse HEAD").toString().trim();
try {
	git.tag = execSync("git describe --exact-match").toString().trim();
} catch {
	git.tag = false;
}

const commitText = `commit [\`${git.currentCommit.slice(0, 8)}\`](https://github.com/AndyThePie/slabbot/commit/${git.currentCommit})`;
const tagText = git.tag ? `[\`${git.tag}\`](https://github.com/AndyThePie/slabbot/releases/tag/${git.tag}) / ` : "";
const branchText = `[\`${git.branch}\`](https://github.com/AndyThePie/slabbot/tree/${git.branch})`;

class SlabbotAbout extends Command {
	constructor() {
		super("about", {
			aliases: ["about"],
			category: "meta",
			description: info.about
		});
	}

	async exec(message) {
		const {uptime} = this.client; // in seconds.

		// get command usage stats from database. null if not connected to database.
		const stats = mongoose.connection.readyState ? await statsModel.find() : null;

		const embed = new MessageEmbed()
			.setColor(SLABBOT_ORANGE)
			.setTitle("[= ^ x ^ =] hello!")
			.setDescription("i'm **<@!729861979677917214>** - an experimental discord bot with some random features my developer (foolishly) thought would be fun to develop.\nsaid programmer is `@12beesinatrenchcoat#7664`, who wanted to learn JavaScript in his spare time or something (the fool...)\nyou can find my source code [here](https://github.com/AndyThePie/slabbot).")
			.setThumbnail("https://raw.githubusercontent.com/AndyThePie/slabbot/master/images/slabbot-icon.png")
			.addFields(
				{
					name: "Version",
					value: "Running " + tagText + commitText + " on branch " + branchText,
					inline: false
				}, {
					name: "Powered by",
					value: "[discord.js](https://discord.js.org) + [Akairo](https://discord-akairo.github.io/)",
					inline: true
				}, {
					name: "Current Uptime",
					value: sToDhms(uptime / 1000),
					inline: true
				}
			);

		if (stats) {
			const sortedStats = stats.sort((a, b) => b.value - a.value);
			const totalCommands = stats.reduce((a, b) => a + b.value, 0);

			let mostUsedString = "";

			for (let i = 0; i < 5; i++) {
				if (!sortedStats[i]) {
					break;
				}

				mostUsedString += (i + 1)
					+ ". `"
					+ sortedStats[i]._id
					+ "` (used "
					+ sortedStats[i].value
					+ " times) \n";
			}

			embed.addFields(
				{
					name: "Total Commands Run",
					value: totalCommands,
					inline: true
				}, { // i hate this
					name: "Most Used Commands",
					value: mostUsedString,
					inline: true
				});
		}

		return message.reply("here's some information about me!", embed);
	}
}

module.exports = SlabbotAbout;
