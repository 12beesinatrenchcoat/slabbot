// commands about slabbot.

const { Command } = require("discord-akairo");

class SlabbotAbout extends Command{
    constructor(){
        super("about", {
            aliases: ["about"]
        });
    }

    exec(message){
        let uptime = (this.client.uptime);

        return message.channel.send(`**[ = ' x ' = ] slabbot** is an experimental discord bot with weird features (that no one ever asked for). 
it is created by \`@AndzCLiv3#7664\`, and its source code can be found here: https://github.com/AndyThePie/slabbot

slabbot has been up for **${uptime}ms** / running version \`dev\`.`);
    }
}


module.exports = SlabbotAbout;