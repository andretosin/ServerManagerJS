const { Events } = require('discord.js');

module.exports = (client) => {
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
}

