// give slabbot some things, and they'll choose one.

const { Command } = require("discord-akairo");
const info = require("../meta/commandinfo.json");

class Decide extends Command {
    constructor() {
        super("decide", {
            aliases: ["decide"],
            category: "utilties",
            description: info.decide,
            args: [
                {
                    id: "items",
                    match: "content",
                }
            ]
        });
    }

    exec(message, args) {
        if(!args.items) {
            return message.reply("you gave me nothing to work with here...");
        }

        const items = args.items.split(",");
        const picked = items[Math.floor(Math.random() * items.length)];
        return message.reply(`I choose ${picked.trim()}!`);
    }
}

module.exports = Decide;