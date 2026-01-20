import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current movie");

export async function execute(interaction) {
    await interaction.reply("⏭️ Skipping to the next movie...");
}
