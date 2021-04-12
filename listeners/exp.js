// see also: me.js (in commands/meta).

const { Listener } = require("discord-akairo");
const userModel = require("../model.user.js");

const { expNeededForLevel } = require.main.require("./things.functions.js");

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

class ExperienceListener extends Listener{
    constructor(){
        super("exp",{
            emitter: "client",
            event: "message",
        });
    }

    async exec(message) {
        if(message.author.bot) {
            return;
        }

        if(await userModel.findById(message.author.id, "exp lastMessageDate") === null) {
            console.log("new user...");
            const user = new userModel({
                _id: message.author.id,
                exp: 0,
                lastMessageDate: message.createdAt
            });

            await user.save();
        }

        var {exp, lastMessageDate, level} = await userModel.findById(message.author.id, "exp lastMessageDate level");

        const lastMessageTimeDiff = message.createdAt - lastMessageDate;

        if(isNaN(lastMessageTimeDiff)) {
            // if null, set value without adding any exp (this shouldn't happen!)
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
        } else if(lastMessageTimeDiff > 6000) {
            // if last message was >6000 milliseconds ago. otherwise, nothing happens. 
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
            let addExp;
            // scaling exp / message, based on time since last message. minimum is ~2.4 (after 6000ms), max is 9 (after 30000ms)
            // see also: https://www.desmos.com/calculator/pci07ccizk
            if (lastMessageTimeDiff <= 15000){
                addExp = lastMessageTimeDiff / 2500;
            } else if(lastMessageTimeDiff <= 30000){
                addExp = (lastMessageTimeDiff - 15000) / 5000 + 6;
            } else {
                addExp = 9;
            }

            await userModel.findByIdAndUpdate(message.author.id, { exp: exp+addExp });
            // console.log(`added ${addExp}exp to user ${message.author.username}!`);
            
            // then check to see if the user has leveled up...
            const expNextLevel = expNeededForLevel(level + 1);

            if(expNextLevel < exp + addExp){
                await userModel.findByIdAndUpdate(message.author.id, { level: level + 1 });
                const bigNumber = toBigNumber(level + 1);
                message.reply("***ding!***\nyou are now level\n```" + bigNumber + "```");
            }
        }
    }
}

module.exports = ExperienceListener;