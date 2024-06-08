const { Events } = require('discord.js');

module.exports = (client) => {
  // Listener de threads
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // Verifique se a reação é de um joinha e se foi na mensagem inicial do canal de boas-vindas
    if (reaction.emoji.name === '👍' && reaction.message.channel.name === 'bem-vindo') {
      // Verifique se o usuário que reagiu é um membro do servidor
      const member = await reaction.message.guild.members.fetch(user.id);
      if (member) {
        console.log(`${member.user.username} reagiu com um joinha na mensagem de boas-vindas.`);
        // Faça o que precisar fazer com a reação aqui
      }
    }
  });
}
