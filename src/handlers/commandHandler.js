import fs from "fs";
import path from "path";

export async function loadCommands(client) {
    client.commands = new Map();

    const commandsPath = path.resolve("src/commands");
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = await import(`../commands/${file}`);
        client.commands.set(command.data.name, command);
    }
}
