// see also: me.js (in commands/meta).
// the exp system! give users exp for messages.
const {Listener} = require("discord-akairo");
const UserModel = require("../model.user.js");

const {expNeededForLevel, toBigNumber} = require.main.require("./things.functions.js");

class ExperienceListener extends Listener {
	constructor() {
		super("exp", {
			emitter: "client",
			event: "message"
		});
	}

	async exec(message) {
		// don't track bots
		if (message.author.bot) {
			return;
		}

		// new users.
		if (await UserModel.findById(message.author.id, "exp lastMessageDate") === null) {
			const user = new UserModel({
				_id: message.author.id,
				exp: 0,
				lastMessageDate: message.createdAt
			});

			await user.save();
		}

		const {exp, lastMessageDate, level} = await UserModel.findById(message.author.id, "exp lastMessageDate level");

		const lastMessageTimeDiff = message.createdAt - lastMessageDate;

		if (isNaN(lastMessageTimeDiff)) {
			// if null, set value without adding any exp (this shouldn't happen!)
			await UserModel.findByIdAndUpdate(message.author.id, {lastMessageDate: message.createdAt});
		} else if (lastMessageTimeDiff > 6000) {
			// if last message was >6000 milliseconds ago. otherwise, nothing happens.
			await UserModel.findByIdAndUpdate(message.author.id, {lastMessageDate: message.createdAt});
			let addExp;
			// scaling exp / message, based on time since last message. minimum is ~2.4 (after 6000ms), max is 9 (after 30000ms)
			// see also: https://www.desmos.com/calculator/pci07ccizk
			if (lastMessageTimeDiff <= 15000) {
				addExp = lastMessageTimeDiff / 2500;
			} else if (lastMessageTimeDiff <= 30000) {
				addExp = ((lastMessageTimeDiff - 15000) / 5000) + 6;
			} else {
				addExp = 9;
			}

			await UserModel.findByIdAndUpdate(message.author.id, {exp: exp + addExp});

			// then check to see if the user has leveled up...
			const expNextLevel = expNeededForLevel(level + 1);

			if (expNextLevel < exp + addExp) {
				await UserModel.findByIdAndUpdate(message.author.id, {level: level + 1});
				const bigNumber = toBigNumber(level + 1);
				message.reply("***ding!***\n```glsl\n# LEVEL UP!\n" + bigNumber + "```");
			}
		}
	}
}

module.exports = ExperienceListener;
