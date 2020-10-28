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
            // if null, set value without adding any exp (this shouldn't happen!)
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
        } else if(lastMessageTimeDiff > 5000) {
            console.log(`${message.author.username} sent a message, but got no exp...`);    
            await userModel.findByIdAndUpdate(message.author.id, { lastMessageDate: message.createdAt });
            let addExp;
            if (lastMessageTimeDiff <= 15000){
                addExp = lastMessageTimeDiff/1000;
            } else if(lastMessageTimeDiff <= 60000){
                addExp = (lastMessageTimeDiff - 15000)/4500+15;
            } else{
                addExp = 25;
            }

            await userModel.findByIdAndUpdate(message.author.id, { exp: exp+addExp });
            console.log(`added ${addExp}exp to user ${message.author.username}!`);
        }
    }
}

module.exports = ExperienceListener;