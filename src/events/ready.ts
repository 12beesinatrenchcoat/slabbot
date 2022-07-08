import {Client} from "discord.js";
import {DJSEvent} from "../Interfaces.js";
import logger from "../logger.js";

export default class implements DJSEvent {
	name = "ready";
	once = true;
	execute = function (client: Client) {
		if (!client.user) {
			return logger.error("missing client.user. this shouldn't happen.");
		}

		return logger.info("Ready! Logged in as " + client.user.tag);
	};
}
