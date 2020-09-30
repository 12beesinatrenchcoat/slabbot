const { AkairoClient, CommandHandler,ListenerHandler } = require("discord-akairo");
const { token, owner } = require("./config.json");

class Client extends AkairoClient{
    constructor(){
        super({
            ownerID: owner
        },{
            disableMentions: "everyone"
        });

        this.commandHandler = new CommandHandler(this, {
            directory: "./commands/",
            prefix: ["sl ","slabbot "],
            defaultCooldown: 2000
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: "./listeners"
        });

        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });
        this.listenerHandler.loadAll();
    }
}



const client = new Client();

client.on("error", () => {
    console.log("sonmething went wrong... [ = ; x ; = ]");
});

client.login(token);



