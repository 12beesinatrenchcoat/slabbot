import {SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "@discordjs/builders";
import {Client, CommandInteraction} from "discord.js";

export interface Command {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
	execute: (arg0: CommandInteraction, arg1: Client) => void;
}

export interface DJSEvent {
	name: string
	once: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	execute: (...args: any) => void
}
