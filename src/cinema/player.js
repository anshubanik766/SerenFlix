import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} from "@discordjs/voice";
import ffmpeg from "ffmpeg-static";
import { spawn } from "child_process";
import { sendCinemaMessage } from "../webhooks/webhookClient.js";
import { config } from "../config.js";
import { setCurrentMovie } from "./state.js";
import { getNextMovie } from "./movieQueue.js";


let connection;
const player = createAudioPlayer();

export async function startCinema(client) {
  const guild = await client.guilds.fetch(config.guildId);
  const channel = guild.channels.cache.get(config.voiceChannelId);

  connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator
  });

  connection.subscribe(player);
  playNext();
}

function playNext() {
    const movie = getNextMovie();

    if (!movie) {
        sendCinemaMessage("📽️ Cinema Empty", "No more movies in the queue!");
        return;
    }

    setCurrentMovie(movie);

    sendCinemaMessage(
        "🎬 Now Playing",
        `**${movie.title}**\nLicense: ${movie.license}\n\nSit back. Let the night flow.`
    );

    const ffmpegProcess = spawn(ffmpeg, [
        "-i", movie.filepath,
        "-f", "s16le",
        "-ar", "48000",
        "-ac", "2",
        "pipe:1"
    ]);

    const resource = createAudioResource(ffmpegProcess.stdout);
    player.play(resource);

    player.once(AudioPlayerStatus.Idle, () => {
        playNext();
    });
}
