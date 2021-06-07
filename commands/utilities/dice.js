// "i used to roll the dice" - coldplay man

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const info = require.main.require("./commandInfo.json");
const { returnError } = require.main.require("./things.functions.js");

// handled user(?) errors.
const e = {
    "missingArguments": {
        "message": "roll... what? [=o x o=]",
        "title": "no dice.",
        "description": "you need to specify dice to roll. say, `d6` for a six-sided die. add a number before that if you want to roll multiple (e.g. `3d20` will roll three 20-sided dice.)"
    },
    "malformedArguments": {
        "message": "i don't understand... [ > x < ]",
        "title": "malformed arguments.",
        "description": "one or more of the arguments you gave aren't right. they must be in the format of `xdy`, where `x` is the number of dice, `y` is the sides of the dice, and `d` is the letter \"d\". \n for the nerds, here's some regex:\n```\n/^([0-9]+|)d[0-9]+/\n```"
    },
    "tooManyDice": {
        "message": "that's... a bit too many dice for me to handle... [> x <]",
        "title": "too many dice!",
        "description": "you can roll at most 100 dice at a time. please split your rolls into multiple messages."
    },
    "tooManySides": {
        "message": "so... many... sides... [= @ x @ =]",
        "title": "too many sides!",
        "description": "please keep the number of sides on each die below 1000000 (ten million)."
    }
};

class DiceRoll extends Command{
    constructor() {
        super("dice", {
            aliases: ["dice", "roll"],
            category: "utilities",
            description: info.dice,
            args: [
                {
                    id: "dice",
                    match: "separate"
                }
            ]
        });
    }
    exec(message, args) {
        if (!args.dice) {
            return returnError(message, e.missingArguments);
        }

        let results = [];
        let diceCount = 0;

        // for checking if the argument is valid
        const regex = /^([0-9]+|)d([0-9]+)/;

        // rolling the dice
        for (const die of args.dice) {

            // does it fit
            if (!regex.test(die)) {
                return returnError(message, e.malformedArguments);
            }

            const values = die.split("d");
            // values[0] is number of dice
            // values[1] is sides to the dice

            diceCount += (parseInt(values[0]) || 1 );

            if (diceCount > 100) {
                return returnError(message, e.tooManyDice);
            }

            if (parseInt(values[1] )> 10000000) {
                return returnError(message, e.tooManySides);
            }

            const min = 1;

            let diceResults = [];

            for (let i = 0; i < (values[0] || 1); i++){
                diceResults.push(Math.floor(Math.random() * (values[1] - min) + min));
            }

            results.push({
                "dice": die,
                "rolls": diceResults
            });
        }

        // formatting results

        const embed = new MessageEmbed()
            .setTitle("rolled "
                + (diceCount == 1 ?
                    "a die!" :
                    diceCount + " dice!") + " :game_die:");

        for (const result of results) {
            const rolls = "`" + result.rolls.join("` `") + "`";
            const total = result.rolls.reduce((a, b) => a + b);

            embed.addField(
                result.dice,
                rolls + " (total " + total + ")",
                true
            );
        }

        return message.reply("the dice hath been rolled!", embed);
    }
}

module.exports = DiceRoll;