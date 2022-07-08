import {Message} from "discord.js";
import {DJSEvent} from "../Interfaces";
import {grantExp} from "../Utilities.exp.js";

export default class implements DJSEvent {
	name = "messageCreate";
	once = false;
	execute = async function (message: Message) {
		grantExp(message.author, message);
	};
}
