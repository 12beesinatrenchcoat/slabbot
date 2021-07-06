// this is so sad play despacito

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");

const videoArray = require("./videos.js");
const info = require.main.require("./commandInfo.json");

const videoArrayLength = videoArray.length - 1;

async function makeEmbed(video, videoArrayPos) {
	const embed = new MessageEmbed()
		.setColor("#FF0000")
		.setTitle(video.title)
		.setDescription(video.description)
		.setURL("https://youtu.be/" + video.id)
		.setAuthor(
			video.creator.name,
			video.creator.icon,
			`https://youtube.com/channel/${video.creator.id}`
		)
		.setFooter(`pos ${videoArrayPos} / ${videoArrayLength}`);
	if (video.thumbOverride) {
		embed.setThumbnail(video.thumbOverride);
	} else {
		embed.setThumbnail(`https://i3.ytimg.com/vi/${video.id}/maxresdefault.jpg`);
	}

	return embed;
}

// what's actually executed when the command is called.
class Despacito extends Command {
	constructor() {
		super("despacito", {
			aliases: ["despacito"],
			regex: /this is so sad play despacito/gi,
			category: "silly",
			description: info.despacito,
			args: [
				{
					id: "videoArrayPos",
					type: "number",
					default: ""
				}
			]
		});
	}

	async exec(message, {videoArrayPos}) {
		if (!videoArrayPos) {
			videoArrayPos = Math.floor(Math.random() * videoArray.length);
			while (message.channel.nsfw === false && videoArray[videoArrayPos].nsfw === true) {
				videoArrayPos = Math.floor(Math.random() * videoArray.length);
				// console.log("random lewd! >_<");
			}
		}

		// video number out of bounds
		if (videoArrayPos > videoArray.length - 1 || videoArrayPos < 0) {
			return OutOfBounds.reply(message, ["max", videoArray.length - 1], ["input", videoArrayPos]);
		}

		const video = videoArray[videoArrayPos];

		// when manually attempting to send an nsfw video in a non-nsfw channel
		if (message.channel.nsfw === false && video.nsfw === true) {
			return TooLewd.reply(message, ["input", videoArrayPos]);
		}

		const embed = await (makeEmbed(video, videoArrayPos));

		return message.util.send(`i hope this cheers you up, <@${message.author.id}>!`, embed);
	}
}

module.exports = Despacito;

// errors
const CommandError = require.main.require("./things.commandError.js");

const OutOfBounds = new CommandError({
	embedTitle: "index out of bounds.",
	embedDescription: "use a number from 0 to {{max}} - or no number for something random. \nyou input `{{input}}`, which is an out of bounds value",
	messageText: "that video... doesn't exist..."
});

const TooLewd = new CommandError({
	embedTitle: "lewd! >_<",
	embedDescription: "you attempted to send a video in position `{{input}}`, which is marked nsfw. \nthe video wasn't sent because this channel is a non-nsfw channel.",
	messageText: "that's lewd! >_<"
});
