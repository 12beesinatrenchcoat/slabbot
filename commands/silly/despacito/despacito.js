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
			const embed = new MessageEmbed()
				.setColor("#FF0000")
				.setTitle("error: that video... doesn't exist")
				.setDescription(`use a number from 0 to ${videoArray.length - 1} - or no number for something random. \nyou input \`${videoArrayPos}\`, which is an out of bounds value.`);

			return message.reply("something... uhh...", embed);
		}

		const video = videoArray[videoArrayPos];

		// when manually attempting to send an nsfw video in a non-nsfw channel
		if (message.channel.nsfw === false && video.nsfw === true) {
			const embed = new MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`you attempted to send a video in position \`${videoArrayPos}\`, which is marked nsfw. \nthe video wasn't sent because this channel is a non-nsfw channel.`)
				.setTitle("error: lewd! >_<");

			return message.channel.send(`that's lewd, <@${message.author.id}>! >_<`, embed);
		}

		const embed = await (makeEmbed(video, videoArrayPos));

		return message.util.send(`i hope this cheers you up, <@${message.author.id}>!`, embed);
	}
}

module.exports = Despacito;
