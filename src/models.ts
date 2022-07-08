import mongoose from "mongoose";
const {Schema} = mongoose;

interface SlabbotCommand {
	_id: string
	value: number
}

const commandUsageSchema = new Schema<SlabbotCommand>({
	_id: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		default: 0,
	},
}, {minimize: false});

const commandUsageDb = mongoose.connection.useDb("slabbot");
const CommandUsageModel = commandUsageDb.model<SlabbotCommand>("globalStats", commandUsageSchema);

interface SlabbotUser {
	_id: string
	exp: number
	level: number
	commandUsage?: Map<string, number>,
	stats?: Map<string, number>,
	lastEventDate: Date
	badges: string[]
}

const usersSchema = new Schema<SlabbotUser>({
	_id: {
		type: String,
		required: true,
	},
	exp: {
		type: Number,
		default: 0,
	},
	level: {
		type: Number,
		default: 0,
	},
	commandUsage: {
		type: Map,
		of: Number,
	},
	stats: {
		type: Map,
		of: Number,
	},
	lastEventDate: Date,
	badges: {
		type: [String],
	},
}, {minimize: false});

const usersDb = mongoose.connection.useDb("slabbot");
const UsersModel = usersDb.model<SlabbotUser>("users", usersSchema);

export {CommandUsageModel, UsersModel, SlabbotCommand, SlabbotUser};
