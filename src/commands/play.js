import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getMovieById } from "../cinema/library.js";
import { setCurrentMovie } from "../cinema/state.js";
import { cinemaIsPlaying, setCurrentMovie } from "./state.js";
import { COLORS } from "./utils/colors.js";
import { addHistory } from "../cinema/history.js";

addHistory(movie, interaction.user);


export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a movie")
    .addStringOption(option =>
        option
            .setName("movie")
            .setDescription("Movie name or ID")
            .setRequired(true)
    );

export async function execute(interaction) {
    const movieId = interaction.options.getString("movie");
    const movie = getMovieById(movieId);

    if (!movie) {
        return interaction.reply({
            content: "❌ Movie not found.",
            flags: 64 // ephemeral (correct way)
        });
    }

    setCurrentMovie(movie, interaction.user);

    const embed = new EmbedBuilder()
        .setTitle(`🎬 Now Playing: ${movie.title}`)
        .setDescription(
            `🔗 **Watch link:** ${movie.url}\n\n` +
            `📢 **${interaction.user.username}** should now **screen-share this tab** in the voice channel.`
        )
        .addFields(
            { name: "Year", value: String(movie.year), inline: true },
            { name: "License", value: movie.license ?? "Unknown", inline: true },
            { name: "Streamer", value: `<@${interaction.user.id}>`, inline: false }
        )
        .setFooter({ text: "SerenFlix Cinema • Public Domain & CC Only" });

    await interaction.reply({ embeds: [embed] });
}

export async function playMovie(movie, webhook) {
    if (cinemaIsPlaying()) return; // 🔑 THIS LINE

    setCurrentMovie(movie);

    await webhook.send({
        embeds: [{
            title: "🎬 Now Playing",
            description: `**${movie.title}** is now streaming`,
            color: COLORS.INFO
        }]
    });
    await webhook.send({
        embeds: [{
            title: "⚠️ Movie Not Found",
            description: "That movie does not exist in the library.",
            color: COLORS.WARNING
        }]
    });
    await webhook.send({
        embeds: [{
            title: "❌ Error",
            description: error.message,
            color: COLORS.ERROR
        }]
    });


}
