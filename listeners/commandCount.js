const { Listener } = require("discord-akairo");

// const userModel = require("../model.user.js");
const statsModel = require("../model.globalStats.js");
const userModel = require("../model.user.js");

async function incrementValueInStatsModel (id, variableToIncrement) {

    if (typeof(id) != "string" || typeof(variableToIncrement) != "string"){
        throw "hey wait that's supposed to be a string!";
    }

    if (await statsModel.findById(id, variableToIncrement) === null) {
        console.log(`added new command (${id}) to database!!`);
        const stat = new statsModel({
            _id: id,
            value: 1,
        });
        await stat.save();

    } else {
        const { value } = await statsModel.findById(id, variableToIncrement);

        await statsModel.findByIdAndUpdate(id, { value: value + 1 });

    }
}

class CommandListener extends Listener {
    constructor() {
        super("commandCounter", {
            emitter: "commandHandler",
            event: "commandFinished"
        });
    }

    async exec(message, command) {

        const commandUsed = command.aliases[0];

        // increment single command count
        incrementValueInStatsModel(commandUsed, "value");

        // user command usage. woot.
        let { stats } = await userModel.findById(message.author.id, "stats");

        if(isNaN(stats[commandUsed])){
            stats[commandUsed] = 0;
        }
        stats[commandUsed]++;

        await userModel.findByIdAndUpdate(message.author.id, { stats: stats });
    }
}

module.exports = CommandListener;