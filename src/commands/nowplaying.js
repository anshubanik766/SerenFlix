import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getCurrentMovie } from "../cinema/state.js";

export const data = new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show the current movie");

export async function execute(interaction) {
    const movie = getCurrentMovie();

    if (!movie) {
        return interaction.reply({
            content: "🎬 No movie is playing right now.",
            ephemeral: true,
        });
    }

    const embed = new EmbedBuilder()
        .setTitle("🎬 Now Playing")
        .setDescription(`**${movie.title}**`)
        .addFields(
            { name: "Year", value: String(movie.year), inline: true },
            { name: "License", value: movie.license ?? "Unknown", inline: true }
        )
        .setFooter({ text: "SerenFlix Cinema" });

    await interaction.reply({ embeds: [embed] });
}
