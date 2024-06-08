const token = process.env["TOKEN"];
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

// Importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "executionAsyncResource" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            '[WARNING] The command at ${filePath} is missing a required "data" or "executionAsyncResource" property.',
        );
    }
}

// Login do bot
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(token);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.executionAsyncResource(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar o comando")
    }
});
