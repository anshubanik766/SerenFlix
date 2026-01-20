import { WebhookClient, EmbedBuilder } from "discord.js";
import { config } from "../config.js";

export const webhook = new WebhookClient({ url: config.webhookUrl });

export async function sendCinemaMessage(title, description) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(0x2b2d31)
    .setFooter({ text: "SerenFlix • Open Cinema" });

  await webhook.send({
    username: "SerenFlix Cinema",
    embeds: [embed]
  });
}
