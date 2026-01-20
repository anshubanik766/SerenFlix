import { SlashCommandBuilder } from "discord.js";
import { getAllMovies } from "../cinema/library.js";

export const data = new SlashCommandBuilder()
    .setName("list")
    .setDescription("Show available movies");

export async function execute(interaction) {
    const movies = getAllMovies();

    const text = movies
        .map(m => `• **${m.id}** — ${m.title}`)
        .join("\n");

    await interaction.reply({
        content: `🎬 **Available Movies**\n\n${text}`,
        ephemeral: true
    });
}
