// a long list of videos.
class Video {
	// eslint-disable-next-line max-params
	constructor(title, description, creator, id, nsfw = false, thumbOverride = "") {
		this.title = title;
		this.description = description;
		this.creator = creator; // contains icon, id, name, from creator.json
		this.id = id;
		this.nsfw = nsfw; // should be boolean
		this.thumbOverride = thumbOverride; // just in case youtube doesn't have maxresdefault.jpg
	}
}

// creators in a separate file, because why not.
const creator = require("./creatorList.json");

// an array containing all the current videos. updated manually [ = ' ^ ' = ]
const videoArray = [
	new Video("Luis Fonsi - Despacito (feat. Daddy Yankee)", "despacito. the original. fonsi.", creator["Luis Fonsi"], "kJQP7kiw5Fk"),
	new Video("Shovel Knightspacito", "groundbreaking", creator.SiIvaGunner, "BoOjcBiZu0I"),
	new Video("a-ha - Take on Me", "a classic from the 80s.", creator.SiIvaGunner, "9BdsS3jK7no"),
	new Video("INITIAL Despacito", "> gotta go fast\n-fonsi", creator["maki ligon"], "zR4GkZcPF_o"),
	new Video("Basics in Despacito", "no running in the halls!", creator["maki ligon"], "gh5hyBy7hks"),
	new Video("Despacito 2", "after 9 years in development, hopefully it was worth the wait", creator.FlyingKitty, "W3GrSMYbkBE"),
	new Video("PewDiePie sings Despacito", "dEeEspAAcIiTO\n(this is a reupload.)", creator.PewDiePie, "obwYkg_LFNQ"),
	new Video("[HQ] Luis Fonsi - Despacito (feat. Daddy Yankee)", "hacker get hacked", creator.recordcollector1972, "n0PnmauFL4Q"),
	new Video("We are Number Despacito", "this is going down in history", creator.Grandayy, "nhcEoLxEPyg"),
	new Video("Minecraftcito", "guys look out fonsi has a ~~diamond~~ netherite sword", creator.ReptileLegit, "Gl6ekgobG2k"),
	new Video("Despacito 13", "now playing: notch fonsi - despacito 13 ft. daddy steve", creator.grande1899, "IQrYcvDQAS8"),
	new Video("Despatrousle", "the song that might play when you date a skeleton", creator["maki ligon"], "4N26Lb95tF8"),
	new Video("Touhoucito", "i don't know enough about touhou to make a good joke here... uhh...\nZUN's gonna need more beer?", creator["maki ligon"], "yD9PCvE-kDg"),
	new Video("Desplatcito", "woomy", creator["maki ligon"], "K_2KOPxwrFY"),
	new Video("Hentaicito", "lewd >_<", creator.DaymanOurSavior, "Vn25uTGgYho", true),
	new Video("Despacitouhou", "ゆ・っく・り・と!", creator["Princess Sylvyspirit"], "bMCkrXaXFCM"),
	new Video("Luis Fonsi, Daddy Yankee - Despacito (Remix) ft. Justin Bieber", "and i was like baby-", creator["Luis Fonsi"], "72UO0v5ESUo"),
	new Video("Luis Fonsi - Despacito 緩緩 (Mandarin Version) ft. JJ Lin", "緩緩 = Despacito = slowly", creator["Luis Fonsi"], "Dlbg7onYu08"),
	new Video("Despacito Chipmunks", 'Remember the good old days of *"Alvin and the Chipmunks"* remixes? Yeah, me neither.', creator.MewChip, "jEOPp4iV1WQ"),
	new Video("Despacito (Cello Cover)", "honestly this one's just good", creator["2CELLOS"], "D9LrEXF3USs"),
	new Video("Kiryu Coco - Despacito", "so this is what vtuber hell looks like\n(this is a reuploaded clip.)", creator["Kiryu Coco"], "9x9Vp2IcUy8", false, "http://i3.ytimg.com/vi/9x9Vp2IcUy8/hqdefault.jpg"),
	new Video("Despacito +NC", "Rule #4295 of the internet: There is no song without a nightcore version.", creator["Nightcore Wolfie"], "hWtJO6m9PxA"),
	new Video("Despacito (Camellia Remix WIPver.)", "SOMEBODY SCREEEEAAAAM\n(this is a reupload. [original tweet here.](https://twitter.com/cametek/status/1018358547745083392))", creator.Camellia, "6MZULvpISnU")
];

module.exports = videoArray;
