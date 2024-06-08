const { Events, ChannelType } = require('discord.js');

module.exports = (client) => {
  client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
    // Verifica se o novo membro possui exatamente um cargo
    const roles = newMember.roles.cache.filter(role => role.id !== newMember.guild.roles.everyone.id);
    if (roles.size === 1) {
      const newRole = newMember.roles.cache.first(); // Pega o primeiro (e único) cargo

      // Verifica se o cargo é "New Member" e se o membro não tinha esse cargo anteriormente
      if (newRole && newRole.name === 'New Member' && !oldMember.roles.cache.has(newRole.id)) {
        const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'bem-vindo');
        if (welcomeChannel) {
          try {
            const thread = await welcomeChannel.threads.create({
              name: `Boas-vindas ${newMember.user.username}!`,
              autoArchiveDuration: 1440,
              reason: 'Nova thread para boas-vindas',
              type: ChannelType.PrivateThread,
            });

            if (thread) {
              console.log('Thread criada com sucesso.');
              
              await thread.send(`${newMember.user} Olá ${newMember.user.username}, seja bem-vindo ao servidor! 😄\n\nPor favor, leia as regras do servidor para garantir uma experiência agradável para todos. 😉\n\nReaja com 👍 para confirmar que leu e concorda com as regras.`);
              const emoji = await thread.fetchEmoji('👍'); // Buscar o emoji 👍
              const message = await thread.messages.fetch({ limit: 1 }); // Pegar a última mensagem
              message.react(emoji); // Reagir à mensagem com 👍
              
            } else {
              console.error('Thread não foi criada corretamente.');
            }
          } catch (error) {
            console.error('Erro ao criar a thread ou enviar a mensagem:', error);
          }
        } else {
          console.error('Canal "bem-vindo" não encontrado.');
        }
      }
    }
  });
}
