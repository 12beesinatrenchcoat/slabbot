import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {Command} from "../Interfaces";
import fetch from "node-fetch";
import logger from "../logger.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import duration from "dayjs/plugin/duration.js";
import {formatNum, generateCommandProblemEmbed, generateProgressBar, msToDuration} from "../Utilities.js";
import NodeCache from "node-cache";

dayjs.extend(relativeTime);
dayjs.extend(duration);

const osuUserCache = new NodeCache({
	stdTTL: 600,
	checkperiod: 60,
});

const {OSU_ID, OSU_SECRET} = process.env;
const baseURL = "https://osu.ppy.sh/api/v2";
let token: string | null = null;

// Rank emojis. If you're hosting this for yourself, you may need to replace these.
const rankEmojis = {
	A: "<:osu_A:994113324449009667>",
	S: "<:osu_S:994113325669568552>",
	SH: "<:osu_SH:994113326554554399>",
	SS: "<:osu_SS:994113417285738547>",
	SSH: "<:osu_SSH:994113327481499728>",
} as const;

auth();

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName("osu")
		.setDescription("get info about osu! stuffs.")
		/* eslint-disable comma-dangle */
		.addSubcommand(subcommand =>
			subcommand.setName("user")
				.setDescription("get info on an osu! player")
				.addStringOption(option =>
					option.setName("user")
						.setDescription("the username of the player.")
						.setRequired(true)
				)
				.addStringOption(option =>
					option.setName("mode")
						.setDescription("which mode to fetch data for. will default to user's default mode if not specified.")
						.addChoices(
							{name: "osu!standard", value: "osu"},
							{name: "osu!taiko", value: "taiko"},
							{name: "osu!catch", value: "fruits"},
							{name: "osu!mania", value: "mania"}
						)
						.setRequired(false)
				)
		); /* TODO: vs!
		.addSubcommand(subcommand =>
			subcommand.setName("vs")
				.setDescription("compare two osu! players")
				.addStringOption(option =>
					option.setName("user1")
						.setDescription("the username of the first player.")
						.setRequired(true)
				)
				.addStringOption(option =>
					option.setName("user2")
						.setDescription("the username of the second player.")
						.setRequired(true)
				)
				.addStringOption(option =>
					option.setName("mode")
						.setDescription("which mode to fetch data for. will default to first user's default mode if not specified.")
						.addChoices(
							{name: "osu!standard", value: "osu"},
							{name: "osu!taiko", value: "taiko"},
							{name: "osu!catch", value: "fruits"},
							{name: "osu!mania", value: "mania"}
						)
						.setRequired(false)
				)b
		); */
	/* eslint-enable comma-dangle */

	cooldown = 15000;

	execute = async (interaction: ChatInputCommandInteraction) => {
		const subcommand = interaction.options.getSubcommand();
		let embed;

		if (subcommand === "user") {
			const user = interaction.options.getString("user", true);
			const mode = interaction.options.getString("mode", false) as GameMode || undefined;

			embed = await makeUserEmbed(user, mode);
		}

		if (subcommand === "vs") {
			// TODO: Add vs command. Release v0.7.0.
			return interaction.reply("vs");
		}

		if(embed) {
			return interaction.reply({
				content: "here's what i found:",
				embeds: [embed],
			});
		}
	};
}

/**
 * Authentication — sets "token", used to fetch data. Important.
 */
async function auth() {
	return fetch("https://osu.ppy.sh/oauth/token", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			/* eslint-disable camelcase */
			client_id: OSU_ID,
			client_secret: OSU_SECRET,
			grant_type: "client_credentials",
			scope: "public",
			/* eslint-enable camelcase */
		}),
	})
		.then(res => res.json() as Promise<{
			token_type: string,
			expires_in: number,
			access_token: string
		}>)
		.then(json => {
			const timeout = json.expires_in * 1000;
			token = json.access_token;
			setTimeout(auth, timeout);
			logger.info("Obtained a token from the osu!api!");
		})
		.catch(error => {
			logger.error(error);
			token = null;
		});
}

/* See: https://osu.ppy.sh/docs/index.html#gamemode */
type GameMode = "osu" | "taiko" | "fruits" | "mania"

const GameModeHumanReadable: {[K in GameMode]: string} = {
	osu: "osu!standard",
	taiko: "osu!taiko",
	fruits: "osu!catch",
	mania: "osu!mania",
};

/* See:
- https://osu.ppy.sh/docs/index.html#usercompact
- https://osu.ppy.sh/docs/index.html#user
- https://osu.ppy.sh/docs/index.html#userstatistics
Not all properties are used.
*/
interface User {
	/** The user's avatar. Returns "/images/layout/avatar-guest.png" if none. */
	avatar_url: string
	/** The amount of beatmaps the user has played (across all modes). */
	beatmap_playcounts_count: number
	cover_url?: string
	country_code: string
	default_group: string
	discord?: string
	/** If this is here, user not found. */
	error: null
	/** The groups the user is in. May be empty. */
	groups: {
		has_listing: boolean
		id: number
		identifier: string
		name: string
		short_name: string
	}[]
	has_supported: boolean
	id: number
	interests?: string
	is_active: boolean
	is_bot: boolean
	is_deleted: boolean
	is_online: boolean
	is_supporter: boolean
	/** When the user joined, in ISO 8601. */
	join_date: string
	/** When the user last logged in, if enabled. (ISO 8601) */
	last_visit?: string
	location?: string
	monthly_playcounts: {
		start_date: string
		count: number
	}[]
	occupation?: string
	/** The user's default mode (not queried mode!!) */
	playmode: GameMode
	playstyle: string[]
	rank_history: {
		mode: GameMode
		data: number[]
	}
	statistics: {
		country_rank?: number
		global_rank?: number
		grade_counts: {
			a: number
			s: number
			sh: number
			ss: number
			ssh: number
		}
		hit_accuracy: number
		is_ranked: number
		level: {
			current: number
			progress: number
		}
		maximum_combo: number
		play_count: number
		/** Playtime duration, in seconds. */
		play_time: number
		/** Funny ranking metric number. */
		pp: number
		ranked_score: number
		total_hits: number
	}
	support_level: 0 | 1 | 2 | 3
	title?: string
	title_url?: string
	twitter?: string
	username: string
	website?: string
}

async function getUser(username: string, mode?: GameMode): Promise<User> {
	const userString = username + (mode ? `/${mode}` : "");

	logger.debug(userString);

	if (osuUserCache.has(userString)) {
		logger.debug(`${userString} found in cache!`);
		return osuUserCache.get(userString) as User;
	}

	const url = baseURL + "/users/" + userString + "?key=username";

	const response = await fetch(url, {
		method: "get",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
		.then(res => res.json() as Promise<User>);

	osuUserCache.set(userString, response);
	return response;
}

async function makeUserEmbed(user: string, mode: GameMode | undefined){
	// Fetch from osu!api
	const data = await getUser(user, mode) as User;

	if (data.error === null) {
		return generateCommandProblemEmbed(
			"user not found!",
			`The osu!api returned an error when looking for user \`${user}\`. The user may have changed their username, their account may be unavailable due to security issues or a restriction, or you may have made a typo!`,
			"error"
		);
	}

	const {statistics} = data;

	/* Title */
	let title = "";
	// Flag + Username
	title += `:flag_${data.country_code.toLowerCase()}: `;
	title += data.username;

	// Supporter level
	if (data.is_supporter) {
		const hearts = ":heart:".repeat(data.support_level);
		title += ` [${hearts}]`;
	}

	// Groups
	for (const group of data.groups) {
		title += " [" + group.short_name + "]";
	}

	/* Footer <- [join_date, last_visit, playstyle] */
	let footer = "";

	const joined = dayjs(data.join_date);
	footer += joined.year() < 2008 // https://osu.ppy.sh/community/forums/posts/6766770
		? "Here since the beginning"
		: joined.format("MMMM YYYY");

	footer += data.last_visit
		? " / Last seen " + dayjs(data.last_visit).fromNow()
		: "";

	if (data.playstyle && data.playstyle.length > 0) {
		footer += " / Plays with " + data.playstyle.join(", ");
	}

	const avatar = data.avatar_url === "/images/layout/avatar-guest.png"
		? "https://a.ppy.sh/"
		: data.avatar_url;

	const embed = new EmbedBuilder()
		.setTitle(title)
		.setURL("https://osu.ppy.sh/users/" + data.id)
		.setColor("#ff66aa")
		.setThumbnail(avatar)
		.setFooter({
			text: footer,
		});

	if (data.cover_url) {
		embed.setImage(data.cover_url);
	}

	if (data.title) {
		embed.setDescription(data.title);
	}

	if (!data.is_bot) {
		embed.setAuthor({
			// Using rank_history.mode — playmode returns user's default
			name: GameModeHumanReadable[data.rank_history.mode],
		})
			.addFields({
				name: " rank",
				value: statistics.global_rank
					? "#" + formatNum(statistics.global_rank)
					: "unranked",
				inline: true,
			}, {
				name: "pp",
				value: formatNum(statistics.pp, 2),
				inline: true,
			}, {
				name: "hit accuracy",
				value: statistics.hit_accuracy.toFixed(2) + "%",
				inline: true,
			}, {
				name: "grades",
				value: // The blank characters at the end are em spaces, U+2003.       ↓↓
					rankEmojis.SSH + " " + formatNum(statistics.grade_counts.ssh) + " "
					+ rankEmojis.SS + " " + formatNum(statistics.grade_counts.ss) + " "
					+ rankEmojis.SH + " " + formatNum(statistics.grade_counts.sh) + " "
					+ rankEmojis.S + " " + formatNum(statistics.grade_counts.s) + " "
					+ rankEmojis.A + " " + formatNum(statistics.grade_counts.a),
				inline: false,
			}, {
				name: "level",
				value: statistics.level.current
					+ " `" + generateProgressBar(statistics.level.progress / 100, 32) + "` "
					+ statistics.level.progress + "%",
				inline: false,
			}, {
				name: "plays",
				value: `${formatNum(statistics.play_count)} plays over ${msToDuration(statistics.play_time * 1000)}`
				+ "\n" + formatNum(data.beatmap_playcounts_count) + " beatmaps played (across all modes)",
				inline: false,
			});
	}

	return embed;
}
