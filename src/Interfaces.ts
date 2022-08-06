import {SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Client, ChatInputCommandInteraction} from "discord.js";

export interface Command {
	data: SlashCommandBuilder |
		SlashCommandSubcommandsOnlyBuilder |
		Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
	execute: (arg0: ChatInputCommandInteraction, arg1: Client) => void;
}

export interface DJSEvent {
	name: string
	once: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	execute: (...args: any) => void
}
