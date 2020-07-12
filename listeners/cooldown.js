const { Listener } = require("discord-akairo");

class CommandCooldown extends Listener {
    constructor() {
        super("cooldown", {
            emitter: "commandHandler",
            event: "cooldown"
        });
    }

    exec(message,command,remaining) {
        message.reply(`chill out! *(:snowflake:${remaining}ms left...)*`)
        console.log(remaining);
    }
}

module.exports = CommandCooldown;