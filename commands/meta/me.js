// stuff about the user

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");

const info = require.main.require("./commandInfo.json");
const userModel = require("../../model.user.js");

const {expNeededForLevel, createExpBar, toBigNumber, fNum} = require.main.require("./things.functions.js");
const {SLABBOT_ORANGE} = require.main.require("./things.constants.js");

class SlabbotMe extends Command {
	constructor() {
		super("me", {
			aliases: ["me"],
			category: "meta",
			description: info.me,
			cooldown: 15000,
			ratelimit: 2
		});
	}

	async exec(message) {
		const user = message.author;

		// fetch exp, level, and stats (command usage)
		const {exp, level, stats} = await userModel.findById(message.author.id, "exp level stats") || 0;

		// TODO: better error handling with new users.
		if (exp === 0) {
			return;
		}

		const guildMember = await message.guild.members.fetch(user.id);
		const nickname = guildMember.nickname ?? "";

		const expForCurrentLevel = expNeededForLevel(level);
		const expForNextLevel = expNeededForLevel(level + 1);
		const percentToNextLevel = ((exp - expForCurrentLevel) / expForNextLevel * 100);

		const sortedStats = Object.entries(stats).sort((a, b) => b[1] - a[1]);
		const totalCommands = Object.values(stats).reduce((a, b) => a + b);

		const expBar = createExpBar(percentToNextLevel, 43);
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
			.setTitle(`\`me\` ${message.author.tag}`)
			.setDescription(description)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp(message.createdTimestamp)
			.addField("Commands Run", `${totalCommands} (mostly \`${fNum(sortedStats[0][0])}\`, ${fNum(sortedStats[0][1])}x)`, true);

		return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
	}
}

module.exports = SlabbotMe;
