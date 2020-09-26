// a classic command that every bot uses. shamelessly stolen from the guide.

const { Command } = require("discord-akairo");
const info = require("./meta/commandinfo.json");

class PingCommand extends Command{
    constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "meta",
            description: info.ping            
        });
    }

    exec(message){
        return message.reply(`pong! (${this.client.ws.ping}ms)`);
    }
}

module.exports = PingCommand;