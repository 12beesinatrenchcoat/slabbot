const { Listener } = require("discord-akairo");
const userModel = require("../model.js");

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

        var {exp, lastMessageDate} = await userModel.findById(message.author.id, "exp lastMessageDate");

        const lastMessageTimeDiff = message.createdAt - lastMessageDate;

        if(isNaN(lastMessageTimeDiff)) {
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
        } else if(lastMessageTimeDiff > 5000) {
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
            const addExp = 5;
            await userModel.findByIdAndUpdate(message.author.id, { exp: exp+addExp });
        }
    }
}

module.exports = ExperienceListener;