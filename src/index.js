import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config.js";
import { startCinema } from "./cinema/player.js";
import { sendCinemaMessage } from "./webhooks/webhookClient.js";
import { loadCommands } from "./handlers/commandHandler.js";
import { COLORS } from "./utils/colors.js";
import { joinUserVoiceChannel } from "./voice/joinVoice.js";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.mentions.has(client.user)) return;

    const member = message.member;

    if (!member.voice.channel) {
        return message.reply({
            embeds: [{
                title: "🔇 Voice Channel Not Found",
                description: "Join a voice channel and ping me again.",
                color: COLORS.ERROR
            }]
        });
    }

    joinUserVoiceChannel(member);

    await message.reply({
        embeds: [{
            title: "🎧 Joined Voice Channel",
            description: `Now connected to **${member.voice.channel.name}**`,
            color: COLORS.INFO
        }]
    });
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

await loadCommands(client);

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        interaction.reply({ content: "❌ Command error.", ephemeral: true });
    }
});

client.once("ready", async () => {
    console.log(`🎬 SerenFlix logged in as ${client.user.tag}`);

    await webhook.send({
        embeds: [{
            title: "🟢 SerenFlix Online",
            description: "The cinema has awakened.\nStreaming will begin shortly.",
            color: COLORS.SUCCESS
        }]
    });
});

client.login(config.token).catch(err => {
    console.error("❌ Discord login failed:", err);
});
