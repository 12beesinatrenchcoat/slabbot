const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const info = require("../meta/commandinfo.json");
const {osu} = require.main.require("./config.json") 

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
    })
;
}

auth()

class OsuStats extends Command{
    constructor(){
        super("osu", {
            aliases: ["osu"],
            category: "games",
            description: info.osu,
            args: [
                {
                    id: "user",
                    type: "string"
                }
            ],
            cooldown: 30000,
            ratelimit: 2
        });
    }

    async exec(message, args){
        if(!args.user) {
            return message.reply("i need something, pal.");
        }

        var user = {};

        await fetch("https://osu.ppy.sh/api/v2/users/" + args.user, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "appliction/json",
                "Authorization": "Bearer "+ token.access_token
            }
        })
        .then(res => res.json())
        .then((json) => {
            // console.log(json);
            const stats = json.statistics;
            const grades = json.statistics.grade_counts;
            let embed = new MessageEmbed()
                .setColor("#ff66aa")
                .setTitle(`\`osu\` / ${json.username} :flag_${json.country_code.toLowerCase()}:`)
                .setURL(`https://osu.ppy.sh/users/${json.id}`)
                .setThumbnail(json.avatar_url)
                .addFields(
                    {
                        "name": "global rank", 
                        "value": "#" + stats.global_rank, 
                        "inline": true 
                    },{
                        "name": "pp",
                        "value": (stats.pp).toFixed(2),
                        "inline": true
                    },{
                        "name": "level",
                        "value": stats.level.current,
                        "inline": true
                    },{
                        "name": "plays and stuff",
                        "value": `${stats.play_count} plays over ${(stats.play_time / 3600).toFixed(2)} hours`,
                    },{
                        "name": "grades",
                        "value": 
                            "<:osu_SSH:822705886005952562>" + grades.ssh +
                            " <:osu_SS:822705886195089408>" + grades.ss +
                            " <:osu_SH:822705886035574824>" + grades.sh +
                            " <:osu_S:822705886040555531>" + grades.s +
                            " <:osu_A:822705886040424468>" + grades.a,    
                    }
                )
                .setTimestamp(message.createdAt);
            
            return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
        })

        
    }
}

module.exports = OsuStats;