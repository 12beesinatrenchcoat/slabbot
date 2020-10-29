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

    exec(message){
        message.reply("slabbot is shutting down... [= - x - =]\ndon't forget to shut down the database, etc. etc.");
        return process.exit();
    }
}

module.exports = SlabbotShutdown;