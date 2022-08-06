import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {Command} from "../Interfaces";

export default class implements Command {
	data = new SlashCommandBuilder()
		.setName("despacito")
		.setDescription("this is so sad play despacito")
		/* eslint-disable comma-dangle */
		.addIntegerOption(option =>
			option.setName("position")
				.setDescription("position in the video list")
				.setMinValue(0)
				.setMaxValue(videos.length - 1)
		);
		/* eslint-enable comma-dangle */

	execute = async (interaction: ChatInputCommandInteraction) => {
		const position: number = interaction.options.getInteger("position", false)
			?? Math.floor(Math.random() * videos.length);

		const video: Video = videos[position];

		const embed = new EmbedBuilder()
			.setColor("#FF0000")
			.setTitle(video.title)
			.setDescription(video.description)
			.setURL("https://youtu.be/" + video.id)
			.setThumbnail(
				video.options?.thumbOverride
				?? `https://i3.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
			)
			.setAuthor({
				name: video.creator.name,
				url: "https://youtube.com/channel/" + video.creator.id,
				iconURL: video.creator.icon,
			})
			.setFooter({
				text: `pos ${position} / ${videos.length - 1}`,
			});

		return interaction.reply({
			content: "i hope this makes you happy…",
			embeds: [embed],
		});
	};
}

interface Video {
	title: string
	description: string
	creator: Creator
	id: string
	options?: {
		nsfw?: boolean
		thumbOverride?: string // For when YouTube doesn't have a "maxresdefault.jpg"
	}
}

interface Creator {
	name: string
	icon: string
	id: string
}

/* Large object after this point!!! */
const creators: {[key:string]: Creator} = {
	"Luis Fonsi": {
		name: "Luis Fonsi",
		icon: "https://yt3.ggpht.com/a/AATXAJzxxCAjbTp4REiYb2YSOeIODVGlEBF6ngglse3k=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCxoq-PAQeAdk_zyg8YS0JqA",
	},
	SiIvaGunner: {
		name: "SiIvaGunner",
		icon: "https://yt3.ggpht.com/a/AATXAJx5QsZV-ZOpmpKxHP4VYnrGtmMpUxkq2s-Ea9SfYw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UC9ecwl3FTG66jIKA9JRDtmg",
	},
	"maki ligon": {
		name: "maki ligon",
		icon: "https://yt3.ggpht.com/a/AATXAJwVgnMDZEEoxrKMkzYjy3MrJLZQeE4w_ydAIjfMfw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCB1XBWo7OMmvAsbiwdNpx1Q",
	},
	FlyingKitty: {
		name: "FlyingKitty",
		icon: "https://yt3.ggpht.com/a/AATXAJxisGfWHqCp1O2vLO8AQ4UZQhD8pj4cNc5k_mwP-w=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCYQT13AtrJC0gsM1far_zJg",
	},
	PewDiePie: {
		name: "PewDiePie",
		icon: "https://yt3.ggpht.com/a/AATXAJzG_RzzNheUdAPucOTvaB4VKLsw8NP8iMpM8rC4eQ=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
	},
	recordcollector1972: {
		name: "recordcollector1972",
		icon: "https://yt3.ggpht.com/a/AATXAJxx9EM3T8PDbADHpgrQiNnEIHC8Em5LmkFP2ZiIPQ=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCiGK0KvXhB2D7bKSz-b3y0w",
	},
	ReptileLegit: {
		name: "ReptileLegit",
		icon: "https://yt3.ggpht.com/a/AATXAJyqj0J5uJIfUfaIftX0A2CZH8QwQ3abLxcf6hspjQ=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCl8LqsuSphURXP0x2402dZg",
	},
	grande1899: {
		name: "grande1899",
		icon: "https://yt3.ggpht.com/a/AATXAJy-g6-bCqm_lxX01cOvatNGicpMLAI2jDdv1vTA=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UC9sY9S-ddN-1E0jD2fFWLig",
	},
	Grandayy: {
		name: "Grandayy",
		icon: "https://yt3.ggpht.com/a/AATXAJzHyqLzSfbPnOcBPXr5DIi337vuSHW9uWY8b9rZpw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCa6TeYZ2DlueFRne5DyAnyg",
	},
	DaymanOurSavior: {
		name: "DaymanOurSavior",
		icon: "https://yt3.ggpht.com/a/AATXAJzZEhvLh4AOJ_LRDIix7My0vn0WCRL4x6J3zkOACQ=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCTLcDwUCBgpm6drTnw6uMuA",
	},
	"Princess Sylvyspirit": {
		name: "Princess Sylvyspirit",
		icon: "https://yt3.ggpht.com/a/AATXAJydnGN3uLIvHstxlJLpWQnoaRZCDL24fm-kCHxEjw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCaPDHoN_sb-Qkk9ObDoKJMA",
	},
	MewChip: {
		name: "MewChip",
		icon: "https://yt3.ggpht.com/a/AATXAJyxy0783lqKz-Di0ZRkLVvimzkkDph9FpLYuZmm=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCBDXk5JRAX3GfyuaR9C2bjA",
	},
	"2CELLOS": {
		name: "2CELLOS",
		icon: "https://yt3.ggpht.com/a/AATXAJxbVFg7UYvX06_Nx85ak5sFwJmHp0-KwxfKlNSAKw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCyjuFsbclXyntSRMBAILzbw",
	},
	"Kiryu Coco": {
		name: "Kiryu Coco",
		icon: "https://yt3.ggpht.com/a/AATXAJz_YJU2_OXLiMyWNFnGaC-LpYTs_06G22ozGVfw=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCS9uQI-jC3DE0L4IpXyvr6w",
	},
	"Nightcore Wolfie": {
		name: "Nightcore Wolfie",
		icon: "https://yt3.ggpht.com/a/AATXAJxkHGuNZNh7pY0SonFlzUlpdOa0eSFLM8GVTqHo=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCS0mAvuPKmDtQEJVs5l8fTg",
	},
	Camellia: {
		name: "Camellia",
		icon: "https://yt3.ggpht.com/a/AATXAJxfdDThFtY1_uYXM3uBUTuAbpOGYxcKbhXGBnir6g=s240-c-k-c0xffffffff-no-rj-mo",
		id: "UCV4ggxLd_Vz-I-ePGSKfFog",
	},
};

/* Very large object!!!!! */
const videos: Video[] = [
	{
		title: "Luis Fonsi - Despacito (feat. Daddy Yankee)",
		description: "despacito. the original. fonsi.",
		creator: creators["Luis Fonsi"],
		id: "kJQP7kiw5Fk",
	}, {
		title: "Shovel Knightspacito",
		description: "*groundbreaking*",
		creator: creators.SiIvaGunner,
		id: "BoOjcBiZu0I",
	}, {
		title: "a-ha - Take on Me",
		description: '"Take On Me" is a song by Norwegian synth-pop band A-ha. The original version, recorded in 1984, was produced by Tony Mansfield and remixed by John Ratcliff. The 1985 international hit version was produced by Alan Tarney for the group\'s debut studio album, Hunting High and Low (1985). The recording combines synth-pop with a varied instrumentation, including acoustic guitars, keyboards, and drums.\n\nThe original 1984 version "Take On Me" failed to chart in the United Kingdom, as did the second version in the first of its two 1985 releases. The second of those 1985 releases charted in September 1985, reaching number two on the UK Singles Chart in October. In the United States in October 1985 the single topped Billboard\'s Hot 100, no doubt bolstered by the wide exposure on MTV of director Steve Barron\'s innovative music video featuring the band in a live-action pencil-sketch animation sequence. The video won six awards and was nominated for two others at the 1986 MTV Video Music Awards.\n\nFrom [Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Take_On_Me)',
		creator: creators.SiIvaGunner,
		id: "9BdsS3jK7no",
	}, {
		title: "INITIAL Despacito",
		description: "> gotta go fast\n-fonsi",
		creator: creators["maki ligon"],
		id: "zR4GkZcPF_o",
	}, {
		title: "Basics in Despacito",
		description: "no running in the halls!",
		creator: creators["maki ligon"],
		id: "gh5hyBy7hks",
	}, {
		title: "Despacito 2",
		description: "after 9 years in development, hopefully it was worth the wait",
		creator: creators.FlyingKitty,
		id: "W3GrSMYbkBE",
	}, {
		title: "PewDiePie sings Despacito",
		description: "dEeEspAAcIiTO\n(this is a reupload.)",
		creator: creators.PewDiePie,
		id: "obwYkg_LFNQ",
	}, {
		title: "[HQ] Luis Fonsi - Despacito (feat. Daddy Yankee)",
		description: "hacker get hacked",
		creator: creators.recordcollector1972,
		id: "n0PnmauFL4Q",
	}, {
		title: "We are Number Despacito",
		description: "this is going down in history",
		creator: creators.Grandayy,
		id: "nhcEoLxEPyg",
	}, {
		title: "Minecraftcito",
		description: "guys look out fonsi has a ~~diamond~~ netherite sword",
		creator: creators.ReptileLegit,
		id: "Gl6ekgobG2k",
	}, {
		title: "Despacito 13",
		description: "now playing: notch fonsi - despacito 13 ft. daddy steve",
		creator: creators.grande1899,
		id: "IQrYcvDQAS8",
	}, {
		title: "Despatrousle",
		description: "the song that might play when you date a skeleton",
		creator: creators["maki ligon"],
		id: "4N26Lb95tF8",
	}, {
		title: "Touhoucito",
		description: "thank you based reimu very cool",
		creator: creators["maki ligon"],
		id: "yD9PCvE-kDg",
	}, {
		title: "Desplatcito",
		description: "woomy",
		creator: creators["maki ligon"],
		id: "K_2KOPxwrFY",
	}, {
		title: "Hentaicito",
		description: "lewd >_<",
		creator: creators.DaymanOurSavior,
		id: "Vn25uTGgYho",
		options: {
			nsfw: true,
		},
	}, {
		title: "Despacitouhou",
		description: "ゆ・っく・り・と!",
		creator: creators["Princess Sylvyspirit"],
		id: "bMCkrXaXFCM",
	}, {
		title: "Luis Fonsi, Daddy Yankee - Despacito (Remix) ft. Justin Bieber",
		description: "and i was like baby-",
		creator: creators["Luis Fonsi"],
		id: "72UO0v5ESUo",
	}, {
		title: "Luis Fonsi - Despacito 緩緩 (Mandarin Version) ft. JJ Lin",
		description: "緩緩 = Despacito = slowly",
		creator: creators["Luis Fonsi"],
		id: "Dlbg7onYu08",
	}, {
		title: "Despacito Chipmunks",
		description: 'Remember the good old days of *"Alvin and the Chipmunks"* remixes? Yeah, me neither.',
		creator: creators.MewChip,
		id: "jEOPp4iV1WQ",
	}, {
		title: "Despacito (Cello Cover)",
		description: "honestly this one's just good",
		creator: creators["2CELLOS"],
		id: "D9LrEXF3USs",
	}, {
		title: "Kiryu Coco - Despacito",
		description: "Thank you, Kiryu Coco. o7\n(this is a reuploaded clip.)",
		creator: creators["Kiryu Coco"],
		id: "9x9Vp2IcUy8",
		options: {
			thumbOverride: "https://i3.ytimg.com/vi/9x9Vp2IcUy8/hqdefault.jpg",
		},
	}, {
		title: "Despacito +NC",
		description: "Rule 134 of the internet: if it exists, there's nightcore of it.",
		creator: creators["Nightcore Wolfie"],
		id: "hWtJO6m9PxA",
	}, {
		title: "Despacito (Camellia Remix WIPver.)",
		description: "SOMEBODY SCREEEEAAAAM\n(this is a reupload. [original tweet here.](https://twitter.com/cametek/status/1018358547745083392))",
		creator: creators.Camellia,
		id: "6MZULvpISnU",
	},
];
