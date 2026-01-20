import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path from "path";

export const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show upcoming movies");

export async function execute(interaction) {
    const moviesPath = path.resolve("data/movies.json");
    const movies = JSON.parse(fs.readFileSync(moviesPath, "utf-8"));

    const list = movies.map((m, i) => `${i + 1}. ${m.title}`).join("\n");

    await interaction.reply({
        content: `🎞️ **Upcoming Movies**\n${list}`,
        ephemeral: true
    });
}
