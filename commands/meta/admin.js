// admin commands.

const { Command } = require("discord-akairo");
const info = require("./commandinfo.json");

class SlabbotShutdown extends Command{
    constructor(){
        super("shutdown", {
            aliases: ["shutdown"],
            category: "meta",
            description: info.shutdown,
            ownerOnly: true
        });
    }

    async exec(message){
        await message.reply("slabbot is shutting down... [= - x - =]");
        // eslint-disable-next-line quotes
        console.log('"sl shutdown" was executed.');  // uses double quotes in message, so single quotes for string instead.

        return process.exit();
    }
}

module.exports = SlabbotShutdown;