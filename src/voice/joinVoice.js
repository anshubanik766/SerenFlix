import { joinVoiceChannel } from "@discordjs/voice";

export function joinUserVoiceChannel(member) {
    const channel = member.voice.channel;
    if (!channel) return null;

    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false
    });
}
