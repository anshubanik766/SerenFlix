import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show upcoming movies");

export async function execute(interaction) {
    await interaction.reply("📜 Queue feature coming soon…");
}
