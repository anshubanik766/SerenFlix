import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("info")
    .setDescription("About SerenFlix");

export async function execute(interaction) {
    await interaction.reply("🎬 **SerenFlix** — a 24/7 public-domain cinema bot.");
}
