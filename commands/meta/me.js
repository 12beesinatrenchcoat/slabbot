// stuff about the user

const { Command } = require("discord-akairo");
const info = require("./commandinfo.json");
const userModel = require("../../model.user.js");

// see also: https://www.desmos.com/calculator/kcrt4evjgg
const expNeededForLevel = level => 1024*(level**1.3)+(level/35)**4.5;

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

        return message.reply(`you are currently level ${level} (${Math.round(percentToNextLevel*100)/100}% of the way to the next level) and have ${Math.round(exp * 1000) / 1000} exp.`);
    }
}

module.exports = SlabbotMe;