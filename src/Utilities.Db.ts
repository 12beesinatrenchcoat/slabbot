/* Functions used relating to the database
(Command Usage, Users) */

import {Snowflake} from "discord.js";
import {CommandUsageModel, SlabbotUser, UsersModel} from "./models.js";

export async function newUser(id: Snowflake): Promise<SlabbotUser> {
	const user = new UsersModel({
		_id: id,
		exp: 0,
		level: 0,
		commandUsage: new Map(),
		stats: new Map(),
		lastMessageDate: new Date(),
		badges: [],
	});
	await user.save();

	return user as SlabbotUser;
}
