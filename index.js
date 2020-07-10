const { AkairoClient, CommandHandler } = require("discord-akairo");
const { token, owner } = require("./config.json");

class Client extends AkairoClient{
    constructor(){
        super({
            ownerID: owner
        },{
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: "./commands/",
            prefix: "slabbot ",
            defaultCooldown: 1000
        });

        this.commandHandler.loadAll();
    }
}



const client = new Client();

client.once("ready", () => {
    console.log("slabbot is ready! [ = ' x ' = ]");
});

client.on("error", () => {
    console.log("sonmething went wrong... [ = ; x ; = ]")
});

client.login(token);



