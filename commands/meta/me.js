// stuff about the user

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const info = require("./commandinfo.json");
const userModel = require("../../model.user.js");

// see also: https://www.desmos.com/calculator/kcrt4evjgg
const expNeededForLevel = level => 1024*(level**1.3)+(level/35)**4.5;

async function createExpBar(percentage, maxLength) {
    let output = "";
    const fillCount = Math.floor(percentage / 100 * maxLength);

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

function toBigNumber(number){

    /* array number corresponds with number. (bigNumbers[0] is zero) 
       object id corresponds with line number (bigNumbers[0].2 is line 2 of zero.). */
    const bigNumbers = [[
        "██████ ",
        "██  ██ ",
        "██  ██ ",
        "██  ██ ",
        "██████ ",
    ],[
        "████   ",
        "  ██   ",
        "  ██   ",
        "  ██   ",
        "██████ "
    ],[
        "██████ ",
        "    ██ ",
        "██████ ",
        "██     ",
        "██████ "
    ],[
        "██████ ",
        "    ██ ",
        "██████ ",
        "    ██ ",
        "██████ "
    ],[
        "██  ██ ",
        "██  ██ ",
        "██████ ",
        "    ██ ",
        "    ██ "
    ],[
        "██████ ",
        "██     ",
        "██████ ",
        "    ██ ",
        "██████ "
    ],[
        "██████ ",
        "██     ",
        "██████ ",
        "██  ██ ",
        "██████ "
    ],[
        "██████ ",
        "    ██ ",
        "    ██ ",
        "    ██ ",
        "    ██ "
    ],[
        "██████ ",
        "██  ██ ",
        "██████ ",
        "██  ██ ",
        "██████ "
    ],[
        "██████ ",
        "██  ██ ",
        "██████ ",
        "    ██ ",
        "██████ "
    ]];
    // turn number into array of numbers
    const numberDigits = Array.from(String(number)).map(Number);


    var output = "";

    for(var line = 0; line < 5; line++) {
        for(var digit = 0; digit < numberDigits.length; digit++) {
            output += bigNumbers[numberDigits[digit]][line];
        }
        output += "\n";
    }

    return output;
}

class SlabbotMe extends Command{
    constructor() {
        super("me",{
            aliases: ["me"],
            category: "meta",
            description: info.me,
            cooldown: 30000,
            ratelimit: 2
        });
    }

    async exec(message) {

        const { exp, level, stats } = await userModel.findById(message.author.id, "exp level stats");

        if(exp === 0){
            return;
        }

        const expForCurrentLevel = expNeededForLevel(level);
        const expForNextLevel = expNeededForLevel(level + 1);
        const percentToNextLevel = ((exp - expForCurrentLevel)/expForNextLevel*100);

        var embed;

        if(message.content.match(/(full)/)){
            // fuller version of card (not mobile-friendly.)

            const sortedStats = Object.entries(stats).sort((a,b,) => b[1] - a[1]);
            const totalCommands = Object.values(stats).reduce((a, b) => a + b);

            const expBar = await createExpBar(percentToNextLevel, 36);
            embed = new MessageEmbed()
                .setColor("#f69321")
                .setTitle(`\`me\` / ${message.author.tag}`)
                .setDescription(
                    `
\`\`\`glsl
# LEVEL 
${toBigNumber(level)}${expBar} ${Math.round(percentToNextLevel*100)/100}%
exp [${Math.round(exp*1000)/1000} / ${Math.round(expForNextLevel*1000)/1000}]
\`\`\`
                `
                )
                .setThumbnail(message.author.avatarURL())
                .setFooter("full stats")
                .setTimestamp(message.createdTimestamp)
                .addField("Favorite Command",`\`${sortedStats[0][0]}\` (used ${sortedStats[0][1]} times)`, true)
                .addField("Commands Used", `${totalCommands}`, true);
        } else {
            // compact/lite version of card.
            const expBar = await createExpBar(percentToNextLevel, 10);
            embed = new MessageEmbed()
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
        }


        return message.channel.send(`here you go, <@!${message.author.id}>!`, embed);
    }
}

module.exports = SlabbotMe;