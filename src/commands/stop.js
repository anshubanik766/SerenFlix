import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the cinema");

export async function execute(interaction) {
    await interaction.reply("⏹️ SerenFlix cinema stopped.");
}
