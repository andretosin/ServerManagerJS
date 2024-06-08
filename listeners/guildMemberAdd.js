const { Events } = require('discord.js');

module.exports = (client) => {
  // Listener de join do servidor
  client.on(Events.GuildMemberAdd, async (member) => {
      try {
          const role = member.guild.roles.cache.find(role => role.name === 'New Member');
          if (role) {
              await member.roles.add(role);
              console.log(`Cargo "${role.name}" atribuído ao membro "${member.user.tag}".`);
          } else {
              console.error(`Cargo não encontrado.`);
          }
      } catch (error) {
          console.error(`Erro ao atribuir o cargo: ${error}`);
      }
  });
}




