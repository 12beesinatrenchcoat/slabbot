// about slabbot.

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const info = require("./commandinfo.json");
const statsModel = require.main.require("./model.globalStats.js");
const { sToDhms } = require.main.require("./things.functions.js");

// all the git stuff.
const { execSync } = require("child_process");
const git = {};
git.branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
git.commitCount = execSync("git rev-list --count " + git.branch).toString().trim();
git.currentCommit = execSync("git rev-parse HEAD").toString().trim();
try{
    git.tag = execSync("git describe").toString().trim();
} catch {
    git.tag = false;
}

const commitText = `commit [\`${git.currentCommit.slice(0,8 )}\`](https://github.com/AndyThePie/slabbot/commit/${git.currentCommit})`;
const tagText = git.tag ? `[\`${git.tag}\`](https://github.com/AndyThePie/slabbot/releases/tag/${git.tag}) / ` : "";
const branchText = `[\`${git.branch}\`](https://github.com/AndyThePie/slabbot/tree/${git.branch})`;

class SlabbotAbout extends Command{
    constructor(){
        super("about", {
            aliases: ["about"],
            category: "meta",
            description: info.about,
            cooldown: 5000
        });
    }

    async exec(message){

        const uptime = (this.client.uptime); // in seconds.

        const stats  = await statsModel.find();
        const sortedStats = stats.sort((a, b) => b.value - a.value);
        const totalCommands = stats.reduce((a, b) => a + b.value, 0);

        const embed = new MessageEmbed()
            .setColor("#f69321")
            .setTitle("[= ^ x ^ =] hello!")
            .setDescription("i'm **<@!729861979677917214>** - an experimental discord bot with some random features my developer (foolishly) thought would be fun to develop.\nsaid programmer is `@12beesinatrenchcoat#7664`, who wanted to learn JavaScript in his spare time or something (the fool...)\nyou can find my source code [here](https://github.com/AndyThePie/slabbot).") 
            .setThumbnail("https://raw.githubusercontent.com/AndyThePie/slabbot/master/images/slabbot-icon.png")
            .addFields(
                {
                    "name": "Version",
                    "value": "Running " + tagText + commitText + " on branch " + branchText,
                    "inline": false
                },{
                    "name": "Powered by", 
                    "value": "[discord.js](https://discord.js.org) + [Akairo](https://discord-akairo.github.io/)\n[Stack Overflow](https://stackoverflow.com)", 
                    "inline": true
                },{
                    "name": "Current Uptime",
                    "value": sToDhms(uptime / 1000),
                    "inline": true
                },{
                    "name": "Total Commands Run",
                    "value": totalCommands,
                    "inline": true
                },{
                    "name":"Most Used Commands",
                    "value": `
1. \`${sortedStats[0]._id}\` (used ${sortedStats[0].value} times)
2. \`${sortedStats[1]._id}\` (used ${sortedStats[1].value} times)
3. \`${sortedStats[2]._id}\` (used ${sortedStats[2].value} times)`,
                    "inline": true
                });

        return message.reply("here's some information about me!", embed);
    }
}


module.exports = SlabbotAbout;