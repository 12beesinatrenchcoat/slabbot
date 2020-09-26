// this is so sad play despacito
// additional notes: originally from despacitoBot; - rewritten and all nice and all that. 

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const creator = require("./creatorlist.json");

// fields: title, descritpion, creator, id, nsfw
class Video{
    constructor(title,description,creator,id,nsfw){
        this.title = title;
        this.description = description;
        this.creator = creator; // contains icon, id, name
        this.id = id;
        this.nsfw = nsfw; //should be boolean
    }
}

// an array containing all the current videos. updated manually [ = ' ^ ' = ]
const videoArray = [
    new Video("Luis Fonsi - Despacito (feat. Daddy Yankee)","despacito. the original. fonsi.",creator["Luis Fonsi"],"kJQP7kiw5Fk",false),
    new Video("Shovel Knightspacito","groundbreaking",creator.SiIvaGunner,"BoOjcBiZu0I",false),
    new Video("a-ha - Take on Me","a classic from the 80s.",creator.SiIvaGunner,"9BdsS3jK7no",false),
    new Video("INITIAL Despacito","gotta go fast -fonsi",creator["maki ligon"],"zR4GkZcPF_o",false),
    new Video("Basics in Despacito","no running in the halls!",creator["maki ligon"],"gh5hyBy7hks",false),
    new Video("Despacito 2","after 9 years in development, hopefully it was worth the wait",creator.FlyingKitty,"W3GrSMYbkBE",false),
    new Video("PewDiePie sings Despacito","dEeEspAAcIiTO\n(reupload.)",creator.PewDiePie,"obwYkg_LFNQ",false),
    new Video("[HQ] Luis Fonsi - Despacito (feat. Daddy Yankee)","hacker get hacked",creator.recordcollector1972,"n0PnmauFL4Q",false),
    new Video("We are Number Despacito","this is going down in history",creator.Grandayy,"nhcEoLxEPyg",false),
    new Video("Minecraftcito","guys look out fonsi has a ~~diamond~~ netherite sword",creator.ReptileLegit,"Gl6ekgobG2k",false),
    new Video("Despacito 13","now playing: notch fonsi - despacito 13 ft. daddy steve",creator.grande1899,"IQrYcvDQAS8",false),
    new Video("Despatrousle","the song that might play when you date a skeleton",creator["maki ligon"],"4N26Lb95tF8",false),
    new Video("Touhoucito","i don't know enough about touhou to make a good joke here... uhh...\nZUN's gonna need more beer?",creator["maki ligon"],"yD9PCvE-kDg",false),
    new Video("Desplatcito","woomy",creator["maki ligon"],"K_2KOPxwrFY",false),
    new Video("Hentaicito","lewd >_<",creator.DaymanOurSavior,"Vn25uTGgYho",true),
    new Video("Despacitouhou","ゆ・っく・り・と!",creator["Princess Sylvyspirit"],"bMCkrXaXFCM",false)
]

// makes an embed
function despacitoEmbed(message, videoArrayPos){

    if (videoArrayPos > videoArray.length || videoArrayPos < 0){
        let embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("error: that video... doesn't exist")
            .setDescription(`use a number from 0 to ${videoArray.length-1} - or no number for something random. \nyou input \`${videoArrayPos}\`, which is an out of bounds value.`)

        return embed;
    }

    let video = videoArray[videoArrayPos];

    while(message.channel.nsfw === false && video.nsfw === true){
        videoArrayPos = Math.floor(Math.random() * videoArray.length);
        console.log("lewd! >_<");
    }

    let embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(video.title)
        .setDescription(video.description)
        .setURL("https://youtu.be/" + video.id)
        .setThumbnail(`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
        .setAuthor(
            video.creator.name,
            video.creator.icon,
            `https://youtube.com/channel/${video.creator.id}`
        )
        .setFooter(`[${videoArrayPos} / ${videoArray.length-1}]`)

    return embed;
}

// what's actually executed when the command is called.
class Despacito extends Command{
    constructor(){
        super("despacito",{
            aliases: ["despacito"],
            regex: /this is so sad play despacito/gi,
            cooldown: 8000,
            ratelimit: 2,
            args: [
                {
                    id: 'videoArrayPos',
                    type: 'number',
                    default: Math.floor(Math.random() * videoArray.length)
                }
            ]
        });
    }

    exec(message, args){
        let embed = despacitoEmbed(message, args.videoArrayPos);
        return message.channel.send(`i hope this cheers you up, <@${message.author.id}>!`, embed);
    }
}

module.exports = Despacito;