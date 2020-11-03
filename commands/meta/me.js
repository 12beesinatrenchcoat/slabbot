// stuff about the user

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const info = require("./commandinfo.json");
const userModel = require("../../model.user.js");

// see also: https://www.desmos.com/calculator/kcrt4evjgg
const expNeededForLevel = level => 1024*(level**1.3)+(level/35)**4.5;

async function createExpBar(percentage, maxLength) {
    let output = "";
    const fillCount = Math.floor(percentage / maxLength);

    for(let char = 0; char < maxLength; char++){

        if (char === 0) {
            output += "[";
        } else if (char <= fillCount) {
            output += "|";
        } else if (char === maxLength - 1) {
            output += "]";
        } else {
            output += " ";
        }
    }

    return output;
}

class SlabbotMe extends Command{
    constructor() {
        super("me",{
            aliases: ["me"],
            category: "meta",
            description: info.me
        });
    }

    async exec(message) {

        const { exp, level } = await userModel.findById(message.author.id, "exp level");

        if(exp === 0){
            return;
        }

        const expForCurrentLevel = expNeededForLevel(level);
        const expForNextLevel = expNeededForLevel(level + 1);
        const percentToNextLevel = ((exp - expForCurrentLevel)/expForNextLevel*100);

        // compact/lite version of card.
        const expBar = await createExpBar(percentToNextLevel, 10);
        const embed = new MessageEmbed()
            .setColor("#f69321")
            .setTitle(`\`me\` / ${message.author.tag}`)
            .setDescription(
                `
\`\`\`glsl
# LEVEL ${level}
${expBar}${Math.round(percentToNextLevel*10)/10}%
${Math.round(exp)} exp
\`\`\`
                `
            )
            .setThumbnail(message.author.avatarURL())
            .setFooter("compact ver.")
            .setTimestamp(message.createdTimestamp);

        return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
    }
}

module.exports = SlabbotMe;