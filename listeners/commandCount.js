const { Listener } = require("discord-akairo");

// const userModel = require("../model.user.js");
const statsModel = require("../model.globalStats.js");

async function incrementValueInDatabase (id, variableToIncrement) {

    if (typeof(id) != "string" || typeof(variableToIncrement) != "string"){
        throw "hey wait that's supposed to be a string!";
    }

    if (await statsModel.findById(id, variableToIncrement) === null) {
        console.log(`added new id (${id}) to database!!`);
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

        // increment single command count
        incrementValueInDatabase(command.aliases[0], "value");
        // increment total command count
        incrementValueInDatabase("totalCommandsUsed", "value");
    }
}

module.exports = CommandListener;