const {Command} = require("discord-akairo");
const {MessageEmbed} = require("discord.js");
const fetch = require("node-fetch");

const info = require.main.require("./commandInfo.json");
const {osu} = require.main.require("./config.json");
const {createExpBar, fNum, getLongMonth, sToDhms} = require.main.require("./things.functions.js");

let token;

async function auth() {
	return fetch("https://osu.ppy.sh/oauth/token", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "appliction/json"
		},
		body: JSON.stringify({
			/* eslint-disable camelcase */
			client_id: osu.id,
			client_secret: osu.secret,
			grant_type: "client_credentials",
			scope: "public"
			/* eslint-enable camelcase */
		})
	})
		.then(res => res.json())
		.then(json => {
			const timeout = json.expires_in * 1000;
			token = json;
			setTimeout(auth, timeout);
		})
		.catch(error => {
			console.log("something went wrong while trying to get a token for the osu!api.\n" + error);
			token = null;
		});
}

auth();

// the stuff that creates the actual embed...
const createProfileEmbed = function (json, modeRequested) {
	const stats = json.statistics;
	const grades = json.statistics.grade_counts;

	const expBar = createExpBar(stats.level.progress, 36);

	// >_< (user with no pfp returns a local path)
	if (json.avatar_url === "/images/layout/avatar-guest.png") {
		// eslint-disable-next-line camelcase
		json.avatar_url = "https://a.ppy.sh/";
	}

	let title = `${json.username} :flag_${json.country_code.toLowerCase()}:`;

	// stuff like -GN's "Champion Above Champions", or BanchoBot's "w00t p00t"
	if (!json.title === null) {
		title += ` [${json.title}]`;
	}

	// date joined / last active
	const joinDate = new Date(json.join_date);
	const joinMonth = getLongMonth(joinDate);
	const joinYear = joinDate.getFullYear();
	// "here since the beginning" seems to be pre-2008
	// see: https://osu.ppy.sh/community/forums/posts/6766770
	const wasHereSinceBeginning = joinYear < 2008;

	const now = Date.now();
	const lastVisit = new Date(json.last_visit);
	const sinceLastVisit = sToDhms((now - lastVisit) / 1000, "obj");

	const joinDateString = wasHereSinceBeginning ?
		"Here since the beginning (" + joinMonth + " " + joinYear + ")" :
		"Joined " + joinMonth + " " + joinYear;

	const lastVisitString = json.is_online ?
		"Currently online" :
		"Last active " + (sinceLastVisit.d || sinceLastVisit.h || sinceLastVisit.m) + "ago";

	// same for all, regardless of user
	const embed = new MessageEmbed()
		.setColor("#ff66aa")
		.setTitle(title)
		.setURL(`https://osu.ppy.sh/users/${json.id}`)
		.setThumbnail(json.avatar_url)
		.setFooter(joinDateString + " / " + lastVisitString);

	// beep boop?
	if (json.is_bot === true) {
		let description = "a chat bot.";

		if (json.username === "BanchoBot") { // the best bot
			description += " helping you help yourself";
			embed.image = {url: "https://i.ppy.sh/35e1889b4ccc5f13a12f44c24efba0b8852c7a4f/687474703a2f2f7075752e73682f326c6466652f38653736313136323132"};
		}

		embed.description = description;
		return embed; // quit function here - bot accounts do not have stats.
	}

	// using player's default mode
	let mode;
	let description;
	switch (json.playmode) {
		case "osu":
			// i'm mad :pink_circle: isn't an actual emoji
			description = "<:pink_circle:830550207699484674> circle clicker";
			mode = "osu!";
			break;
		case "taiko":
			description = ":drum: drum basher";
			mode = "osu!taiko";
			break;
		case "fruits":
			description = ":apple: fruit catcher";
			mode = "osu!catch";
			break;
		case "mania":
			description = ":musical_keyboard: key smasher";
			mode = "osu!mania";
			break;
		default:
	}

	embed.setDescription(description);
	embed.setTitle(title + " (" + (modeRequested ?? mode) + ")");

	embed.addFields(
		{
			name: "global rank",
			value: stats.global_rank ? "#" + fNum(stats.global_rank) : "unranked",
			inline: true
		}, {
			name: "pp",
			value: fNum(stats.pp, 2),
			inline: true
		}, {
			name: "accuracy",
			value: fNum(stats.hit_accuracy, 2) + "%",
			inline: true
		}, {
			name: "level",
			value: stats.level.current + " `" + expBar + "` " + stats.level.progress + "%"
		}, {
			name: "plays and stuff",
			value: `${fNum(stats.play_count)} plays over ${fNum(stats.play_time / 3600, 2)} hours\nplayed ${fNum(json.beatmap_playcounts_count)} maps (across all modes)`
		}, {
			name: "grades",
			value: // the blank characters in the quotes are em spaces, U+2003.
            "<:osu_SSH:828667457891860535> " + fNum(grades.ssh) + " " +
            "<:osu_SS:828667457954775040> " + fNum(grades.ss) + " " +
            "<:osu_SH:828667457915846656> " + fNum(grades.sh) + " " +
            "<:osu_S:828667457719238667> " + fNum(grades.s) + " " +
            "<:osu_A:828667457307672627> " + fNum(grades.a)
			// these emoji are in a private server - you can find copies of them in /images/emojis/osu_ranks
		}
	);

	return embed;
};

// and now actually defining the actual command...
class OsuStats extends Command {
	constructor() {
		super("osu", {
			aliases: [
				"osu", // will use user's default mode
				"osu!", // other command aliases are mode-specific
				"osu!taiko",
				"osu!catch",
				"osu!mania"
			],
			category: "games",
			description: info.osu,
			args: [
				{
					id: "user",
					match: "content" // because usernames can have spaces???
				}
			],
			cooldown: 30000,
			ratelimit: 3
		});
	}

	async exec(message, args) {
		// in case something went wrong with authentication... try again!
		if (token === null) {
			console.log("trying to get a token again...");
			await auth();
		}

		if (!args.user) {
			return message.reply("you need to specify a user - a username or an id.");
		}

		// using different aliases results in different modes being fetched
		let GameMode = ""; // only used in request
		switch (message.util.parsed.alias) {
			case "osu!":
				GameMode += "osu";
				break;
			case "osu!taiko":
				GameMode += "taiko";
				break;
			case "osu!catch":
				GameMode += "fruits";
				break;
			case "osu!mania":
				GameMode += "mania";
				break;
			default:
		}

		const url = "https://osu.ppy.sh/api/v2/users/" + args.user + "/" + GameMode;

		// making the request
		await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + token.access_token
			}
		})
			.then(res => res.json())
			.then(json => { // doing stuff with the output
				const modeRequested = message.util.parsed.alias === "osu" ?
					null :
					message.util.parsed.alias; // mode-specific alias used

				const embed = createProfileEmbed(json, modeRequested);

				return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
			})
			.catch(error => {
				console.log(error);
				const embed = new MessageEmbed()
					.setTitle("error: something went wrong...")
					.setColor("#FF0000")
					.setDescription("make sure you spelled the username / typed the id correctly. otherwise, please [file an issue](https://github.com/AndyThePie/slabbot/issues) because *something* has gone catastrophically wrong.)");
				return message.reply("sorry about this... [=^x^;=]", embed);
			});
	}
}

module.exports = OsuStats;
