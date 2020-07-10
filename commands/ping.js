// a classic command that every bot uses. shamelessly stolen from the guide.

const { Command } = require("discord-akairo");

class PingCommand extends Command{
    constructor() {
        super("ping", {
            aliases: ["ping"]
        });
    }

    exec(message){
        return message.reply(`pong! (${this.client.ws.ping}ms)`);
    }
}

module.exports = PingCommand;