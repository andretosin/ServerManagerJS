const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some Title')
    .setDescription('Some description here')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  

module.exports = {
  data: new SlashCommandBuilder()
      .setName('git')
      .setDescription('Relembrar comandos do Git'),

  async executionAsyncResource(interaction) {
    await interaction.reply({ embeds: [exampleEmbed] });
  }
}

