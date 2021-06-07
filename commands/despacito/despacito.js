// this is so sad play despacito

const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");

const creator = require("./creatorlist.json");
const info = require.main.require("./commandInfo.json");

class Video {
	constructor(title, description, creator, id, nsfw = false, thumbOverride = "") {
		this.title = title;
		this.description = description;
		this.creator = creator; // contains icon, id, name, from creator.json
		this.id = id;
		this.nsfw = nsfw; // should be boolean
		this.thumbOverride = thumbOverride; // just in case youtube doesn't have maxresdefault.jpg
	}
}

// an array containing all the current videos. updated manually [ = ' ^ ' = ]
const videoArray = [
	new Video("Luis Fonsi - Despacito (feat. Daddy Yankee)", "despacito. the original. fonsi.", creator["Luis Fonsi"], "kJQP7kiw5Fk"),
	new Video("Shovel Knightspacito", "groundbreaking", creator.SiIvaGunner, "BoOjcBiZu0I"),
	new Video("a-ha - Take on Me", "a classic from the 80s.", creator.SiIvaGunner, "9BdsS3jK7no"),
	new Video("INITIAL Despacito", "gotta go fast -fonsi", creator["maki ligon"], "zR4GkZcPF_o"),
	new Video("Basics in Despacito", "no running in the halls!", creator["maki ligon"], "gh5hyBy7hks"),
	new Video("Despacito 2", "after 9 years in development, hopefully it was worth the wait", creator.FlyingKitty, "W3GrSMYbkBE"),
	new Video("PewDiePie sings Despacito", "dEeEspAAcIiTO\n(reupload.)", creator.PewDiePie, "obwYkg_LFNQ"),
	new Video("[HQ] Luis Fonsi - Despacito (feat. Daddy Yankee)", "hacker get hacked", creator.recordcollector1972, "n0PnmauFL4Q"),
	new Video("We are Number Despacito", "this is going down in history", creator.Grandayy, "nhcEoLxEPyg"),
	new Video("Minecraftcito", "guys look out fonsi has a ~~diamond~~ netherite sword", creator.ReptileLegit, "Gl6ekgobG2k"),
	new Video("Despacito 13", "now playing: notch fonsi - despacito 13 ft. daddy steve", creator.grande1899, "IQrYcvDQAS8"),
	new Video("Despatrousle", "the song that might play when you date a skeleton", creator["maki ligon"], "4N26Lb95tF8"),
	new Video("Touhoucito", "i don't know enough about touhou to make a good joke here... uhh...\nZUN's gonna need more beer?", creator["maki ligon"], "yD9PCvE-kDg"),
	new Video("Desplatcito", "woomy", creator["maki ligon"], "K_2KOPxwrFY"),
	new Video("Hentaicito", "lewd >_<", creator.DaymanOurSavior, "Vn25uTGgYho", true),
	new Video("Despacitouhou", "ゆ・っく・り・と!", creator["Princess Sylvyspirit"], "bMCkrXaXFCM"),
	new Video("Luis Fonsi, Daddy Yankee - Despacito (Remix) ft. Justin Bieber", "baby please don't go", creator["Luis Fonsi"], "72UO0v5ESUo"),
	new Video("Luis Fonsi - Despacito 緩緩 (Mandarin Version) ft. JJ Lin", "緩緩 = Despacito = slowly", creator["Luis Fonsi"], "Dlbg7onYu08"),
	new Video("Despacito Chipmunks", 'Remember the good old days of *"Alvin and the Chipmunks"* remixes? Yeah, me neither.', creator.MewChip, "jEOPp4iV1WQ"),
	new Video("Despacito (Cello Cover)", "honestly this one's just good", creator["2CELLOS"], "D9LrEXF3USs"),
	new Video("Kiryu Coco - Despacito", "so this is what vtuber hell looks like\n(this is a reuploaded clip.)", creator["Kiryu Coco"], "9x9Vp2IcUy8", false, "http://i3.ytimg.com/vi/9x9Vp2IcUy8/hqdefault.jpg"),
	new Video("Despacito +NC", "Rule #4295 of the internet: There is no song without a nightcore version.", creator["Nightcore Wolfie"], "hWtJO6m9PxA"),
	new Video("Despacito (Camellia Remix WIPver.)", "SOMEBODY SCREEEEAAAAM\n(reupload. original tweet here: https://twitter.com/cametek/status/1018358547745083392)", creator.Camellia, "6MZULvpISnU")
];

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
		.setFooter(`pos ${videoArrayPos} / ${videoArray.length - 1}`);
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
			category: "dead memes",
			description: info.despacito,
			cooldown: 8000,
			ratelimit: 2,
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
				console.log("random lewd! >_<");
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
