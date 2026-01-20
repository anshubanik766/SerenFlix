import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start the cinema");

export async function execute(interaction) {
    await interaction.reply("▶️ SerenFlix cinema starting…");
}
