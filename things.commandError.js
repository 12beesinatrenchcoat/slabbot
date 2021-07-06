// handling command errors, or something.

const {MessageEmbed} = require("discord.js");

class CommandError {
	constructor(contents = {}) {
		this.contents = contents;
	}

	// message should be a Message, placeholders should be [String].
	reply(message, ...placeholders) {
		const embed = new MessageEmbed()
			.setTitle("error: " + this.contents.embedTitle)
			.setFooter("if this shouldn't happen, please file an issue (see github)!")
			.setColor("RED");

		let {embedDescription} = this.contents;

		placeholders.forEach(placeholder => {
			embedDescription = embedDescription.replace("{{" + placeholder[0] + "}}", placeholder[1]);
		});
		embed.setDescription(embedDescription);

		return message.reply(this.contents.messageText, embed);
	}
}

module.exports = CommandError;
