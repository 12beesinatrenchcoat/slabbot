const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const info = require("../meta/commandinfo.json");
const {osu} = require.main.require("./config.json") ;
const {createExpBar, fNum} = require.main.require("./things.js") ;

var token = {};

async function auth(){
    return fetch("https://osu.ppy.sh/oauth/token", {
        method: "post",
        headers:{
            "Accept": "application/json",
            "Content-Type": "appliction/json"
        },
        body: JSON.stringify({
            "client_id": osu.id,
            "client_secret": osu.secret,
            "grant_type": "client_credentials",
            "scope": "public"
        })
    })
        .then(res => res.json())
        .then((json) => {
            // console.log(json);
            const timeout = json.expires_in * 1000;
            token = json;
            setTimeout(auth, timeout);
        });
}

auth();

class OsuStats extends Command{
    constructor(){
        super("osu", {
            aliases: [
                "osu",  // will use user's default mode
                "osu!",
                "osu!taiko",
                "osu!catch",
                "osu!mania"
            ],
            category: "games",
            description: info.osu,
            args: [
                {
                    id: "user",
                    match: "content"
                }
            ],
            cooldown: 30000,
            ratelimit: 2
        });
    }

    async exec(message, args){
        if(!args.user) {
            return message.reply("you need to specify a user - a username or an id.");
        }

        let GameMode = "";  // used only in api request.

        switch(message.util.parsed.alias){
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
        }

        const url = "https://osu.ppy.sh/api/v2/users/" + args.user + "/" + GameMode;

        await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token.access_token
            }
        })
            .then(res => res.json())
            .then((json) => {
                const stats = json.statistics;
                const grades = json.statistics.grade_counts;

                const expBar = createExpBar(stats.level.progress, 36);

                // >_< (user with no pfp returns a local path)
                if(json.avatar_url == "/images/layout/avatar-guest.png"){
                    json.avatar_url = "https://a.ppy.sh/";
                }

                let title = `${json.username} :flag_${json.country_code.toLowerCase()}:`;

                // stuff like -GN's "Champion Above Champions", or BanchoBot's "w00t p00t"
                if(json.title != null){
                    title += ` [${json.title}]`;
                }

                let mode;
                let description;

                if(json.is_bot == true){  // beep boop
                    let embed = new MessageEmbed()
                        .setColor("#ff66aa")
                        .setTitle(title)
                        .setURL(`https://osu.ppy.sh/users/${json.id}`)
                        .setThumbnail(json.avatar_url);
                
                    let description = "a chat bot.";
                    if(json.username == "BanchoBot"){  // the best bot
                        description += " helping you help yourself";
                        embed.image = { url: "https://i.ppy.sh/35e1889b4ccc5f13a12f44c24efba0b8852c7a4f/687474703a2f2f7075752e73682f326c6466652f38653736313136323132" };
                    }

                    embed.description = description;
                
                    return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
                } else {
                    switch(json.playmode){
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
                    }
                }


                if(message.util.parsed.alias != "osu"){
                    mode = message.util.parsed.alias;
                }

                let embed = new MessageEmbed()
                    .setColor("#ff66aa")
                    .setTitle(title + " (" + mode + ")")
                    .setDescription(description)
                    .setURL(`https://osu.ppy.sh/users/${json.id}`)
                    .setThumbnail(json.avatar_url)
                    .addFields(
                        {
                            "name": "global rank", 
                            "value": "#" + fNum(stats.global_rank), 
                            "inline": true 
                        },{
                            "name": "pp",
                            "value": fNum(stats.pp, 2),
                            "inline": true
                        },{
                            "name": "accuracy",
                            "value": fNum(stats.hit_accuracy, 2) + "%",
                            "inline": true
                        },{
                            "name": "level",
                            "value": stats.level.current + " `" + expBar + "` " + stats.level.progress + "%"
                        },{
                            "name": "plays and stuff",
                            "value": `${fNum(stats.play_count)} plays over ${fNum(stats.play_time / 3600, 2)} hours\nplayed ${fNum(json.beatmap_playcounts_count)} maps (across all modes)`,
                        },{
                            "name": "grades",
                            "value":
                            "<:osu_SSH:828667457891860535> " + fNum(grades.ssh) + " " +
                            "<:osu_SS:828667457954775040> " + fNum(grades.ss) + " " +
                            "<:osu_SH:828667457915846656> " + fNum(grades.sh) + " " +
                            "<:osu_S:828667457719238667> " + fNum(grades.s) + " " +
                            "<:osu_A:828667457307672627> " + fNum(grades.a)
                            // these emoji are in a private server - you can find copies of them in /images/emojis/osu_ranks 
                        }
                    )
                    .setTimestamp(message.createdAt);
            
                return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
            })
            .catch((error) => {
                console.log(error);
                const embed = new MessageEmbed()
                    .setTitle("error: not found")
                    .setColor("#FF0000")
                    .setDescription("the user you looked for doesn't exist. make sure you typed their username / id correctly!\n(unless the user exists, in which case, please [file an issue](https://github.com/AndyThePie/slabbot/issues) because *something* has gone catastrophically wrong.)");
                return message.reply("something went wrong...", embed);
            });
    }
}

module.exports = OsuStats;