// stuff about the user

const { Command } = require("discord-akairo");
const info = require("./commandinfo.json");
const userModel = require("../../model.js");

class SlabbotMe extends Command{
    constructor() {
        super("me",{
            aliases: ["me"],
            category: "meta",
            description: info.me
        });
    }

    async exec(message) {

        if(await userModel.findById(message.author.id, "exp") === null) {
            console.log("new user...");
            const user = new userModel({
                _id: message.author.id,
                exp: 0
            });

            await user.save();
        }

        const { exp } = await userModel.findById(message.author.id, "exp");

        return message.reply(`you currently have ${exp} exp.`);
    }
}

module.exports = SlabbotMe;