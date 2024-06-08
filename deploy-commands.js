// Executar código dentro do index.js devido aos secrets
const { REST, Routes } = require("discord.js");

const token = process.env["TOKEN"];
const clientId = process.env["CLIENT_ID"];
const guildId = process.env["GUILD_ID"];

// Importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Instancia REST
const rest = new REST({ version: "10" }).setToken(token);

// Deploy
(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`,
		);
	
		console.log("Tokens:");
		console.log("  TOKEN:",token);
		console.log("  CLIENT_ID:", clientId);
		console.log("  GUILD_ID:", guildId);
		
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId), 
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`,
		);
	} catch (error) {
		console.log(error);
	}
})();