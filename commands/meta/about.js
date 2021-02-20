// about slabbot.

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const info = require("./commandinfo.json");
const statsModel = require("../../model.globalStats.js");

class SlabbotAbout extends Command{
    constructor(){
        super("about", {
            aliases: ["about"],
            category: "meta",
            description: info.about,
            cooldown: 30000
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
            .setDescription("**slabbot** (<@!729861979677917214>) is an experimental discord bot with weird features (that no one ever asked for).\n\nit is being created by `@12beesinatrenchcoat#7664` / <@!231899170716385280>, as a really questionable way to learn how to program in JavaScript.\n\nthe bot is also open source. source code here. https://github.com/AndyThePie/slabbot")
            .setThumbnail("https://raw.githubusercontent.com/AndyThePie/slabbot/master/images/slabbot-icon.png")
            .addField("Powered by", "discord.js + Akairo\nStack Overflow", true)
            .addField("Current Uptime",`${Math.round(uptime/10)/100}s`,true)
            .addField("Total Commands Run",totalCommands,true)
            .addField("Most Used Commands",`
            1. \`${sortedStats[0]._id}\` (used ${sortedStats[0].value} times)
            2. \`${sortedStats[1]._id}\` (used ${sortedStats[1].value} times)
            3. \`${sortedStats[2]._id}\` (used ${sortedStats[2].value} times)
            `,true);

        return message.reply("here's some information about me!", embed);
    }
}


module.exports = SlabbotAbout;