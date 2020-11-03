const { Listener } = require("discord-akairo");
const userModel = require("../model.user.js");

// see also: https://www.desmos.com/calculator/kcrt4evjgg
const expNeededForLevel = level => 1024*(level**1.3)+(level/35)**4.5;

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

    console.log(`numberDigits = ${numberDigits}`);

    var output = "";

    for(var line = 0; line < 5; line++) {
        for(var digit = 0; digit < numberDigits.length; digit++) {
            console.log(numberDigits[digit]);
            output += bigNumbers[numberDigits[digit]][line];
        }
        output += "\n";
    }

    console.log("output!");
    console.log(output);
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
        } else if(lastMessageTimeDiff > 5000) {
            // if last message was >5000 milliseconds ago. otherwise, nothing happens. 
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
            let addExp;
            // see also: https://www.desmos.com/calculator/rs1k8grtc9
            if (lastMessageTimeDiff <= 15000){
                addExp = lastMessageTimeDiff/1000;
            } else if(lastMessageTimeDiff <= 60000){
                addExp = (lastMessageTimeDiff - 15000)/4500+15;
            } else{
                addExp = 25;
            }

            await userModel.findByIdAndUpdate(message.author.id, { exp: exp+addExp });
            console.log(`added ${addExp}exp to user ${message.author.username}!`);
            
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