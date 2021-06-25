// stuff about the user

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");

const info = require.main.require("./commandInfo.json");
const userModel = require("../../model.user.js");

const {expNeededForLevel, createExpBar, toBigNumber, fNum} = require.main.require("./things.functions.js");
const {SLABBOT_ORANGE} = require.main.require("./things.constants.js");

async function getNickname(message, user) {
	const guildMember = await message.guild ? await message.guild.members.fetch(user.id) : "";
	return guildMember.nickname ?? "";
}

// dbObject is an object containing stuff from the mongoDB. may change.
function createMeEmbed(user, nickname, dbObject) {
	const {exp = 0, level = 0, stats = null} = dbObject;

	const expForCurrentLevel = expNeededForLevel(level);
	const expForNextLevel = expNeededForLevel(level + 1);
	const percentToNextLevel = ((exp - expForCurrentLevel) / expForNextLevel * 100);

	const expBar = createExpBar(percentToNextLevel, 44);
	const bigLevelNumber = toBigNumber(level);

	const description = `
${nickname ? "also known as `" + nickname + "`" : ""}
\`\`\`glsl
# LEVEL ${"—".repeat(((level.toString().length - 1) * 7))}
${bigLevelNumber}${expBar}
${percentToNextLevel.toFixed(2)}% (${exp.toFixed(3)} exp)
${(expForNextLevel - exp).toFixed(3)} to next level
\`\`\`
`;

	const embed = new MessageEmbed()
		.setColor(SLABBOT_ORANGE)
		.setTitle(`\`me\` ${user.tag}`)
		.setDescription(description)
		.setThumbnail(user.avatarURL())
		.setTimestamp(new Date().getTime());
	if (stats) {
		const sortedStats = Object.entries(stats).sort((a, b) => b[1] - a[1]);
		const totalCommands = Object.values(stats).reduce((a, b) => a + b);
		embed.addField("Commands Run", `${totalCommands} (mostly \`${fNum(sortedStats[0][0])}\`, ${fNum(sortedStats[0][1])}x)`, true);
	}

	return embed;
}

class SlabbotMe extends Command {
	constructor() {
		super("me", {
			aliases: ["me"],
			category: "meta",
			description: info.me,
			cooldown: 15000,
			ratelimit: 2,
			args: [
				{
					id: "user",
					type: "user"
				}
			]

		});
	}

	async exec(message, args) {
		let text = "here you go!";
		const user = args.user ?? message.author;
		const nickname = await getNickname(message, user);

		// fetch exp, level, and stats (command usage)
		const {exp, level, stats} = await userModel.findById(user.id, "exp level stats") || 0;

		if (user.bot === true) {
			return message.reply("that's a bot!... i don't track those.");
		}

		if (!stats && user !== message.author) {
			return message.reply("that user isn't in my database...");
		}

		// new user who decides to just use "sl me"
		if (!stats && user === message.author) {
			text = `hello <@!${message.author.id}>, i'm slabbot!`;
		}

		const embed = createMeEmbed(user, nickname, {exp, level, stats});

		return message.channel.send(text, embed);
	}
}

module.exports = SlabbotMe;
