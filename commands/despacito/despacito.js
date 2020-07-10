// this is so sad play despacito
// additional notes: originally from despacitoBot; - rewritten and all nice and all that. 

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const creator = require("./creatorlist.json");

// fields: title, descritpion, creator, id
class Video{
    constructor(title,description,creator,id){
        this.title = title;
        this.description = description;
        this.creator = creator; // contains icon, id, name
        this.id = id;
    }
}

// an array containing all the current videos. updated manually [ = ' ^ ' = ]
const videoArray = [
    new Video("Luis Fonsi - Despacito (feat. Daddy Yankee)","despacito. the original. fonsi.",creator["Luis Fonsi"],"kJQP7kiw5Fk"),
    new Video("Shovel Knightspacito","groundbreaking",creator.SiIvaGunner,"BoOjcBiZu0I"),
    new Video("a-ha - Take on Me","a classic from the 80s.",creator.SiIvaGunner,"9BdsS3jK7no"),
    new Video("INITIAL Despacito","gotta go fast -fonsi",creator["maki ligon"],"zR4GkZcPF_o"),
    new Video("Basics in Despacito","no running in the halls!",creator["maki ligon"],"gh5hyBy7hks"),
    new Video("Despacito 2","after 9 years in development, hopefully it was worth the wait",creator.FlyingKitty,"W3GrSMYbkBE"),
    new Video("PewDiePie sings Despacito","dEeEspAAcIiTO\n(reupload.)",creator.PewDiePie,"obwYkg_LFNQ"),
    new Video("[HQ] Luis Fonsi - Despacito (feat. Daddy Yankee)","hacker get hacked",creator.recordcollector1972,"n0PnmauFL4Q"),
    new Video("We are Number Despacito","this is going down in history",creator.Grandayy,"nhcEoLxEPyg"),
    new Video("Minecraftcito","guys look out fonsi has a ~~diamond~~ netherite sword",creator.ReptileLegit,"Gl6ekgobG2k"),
    new Video("Despacito 13","now playing: notch fonsi - despacito 13 ft. daddy steve",creator.grande1899,"IQrYcvDQAS8"),
    new Video("Despatrousle","the song that might play when you date a skeleton",creator["maki ligon"],"4N26Lb95tF8"),
    new Video("Touhoucito","i don't know enough about touhou to make a good joke here... uhh...\nZUN's gonna need more beer?",creator["maki ligon"],"yD9PCvE-kDg"),
    new Video("Desplatcito","woomy",creator["maki ligon"],"K_2KOPxwrFY")
]

// gets a random item from the videoArray and makes an embed out of it.
function getRandom(){
    let itemNum = Math.floor(Math.random() * videoArray.length);
    let randomItem = videoArray[itemNum];
    let creator = randomItem.creator;

    let embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(randomItem.title)
        .setDescription(randomItem.description)
        .setURL("https://youtu.be/" + randomItem.id)
        .setThumbnail(`https://img.youtube.com/vi/${randomItem.id}/sddefault.jpg`)
        .setAuthor(creator.name,creator.icon,`https://youtube.com/channel/${creator.id}`)
        .setFooter(`[${itemNum} / ${videoArray.length-1}]`)

    return embed;
}

// what's actually executed when the command is called.
class Despacito extends Command{
    constructor(){
        super("getDespacito",{
            aliases: ["despacito"],
            regex: /this is so sad play despacito/gi
        });
    }

    exec(message){
        let embed = getRandom();
        return message.channel.send(`i hope this cheers you up, <@${message.author.id}>!`,embed);
    }
}

module.exports = Despacito;