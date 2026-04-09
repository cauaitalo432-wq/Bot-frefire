const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', () => {
  console.log(`Bot ligado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'sala') {
    const channel = await interaction.guild.channels.create({
      name: `sala-${interaction.user.username}`,
      type: 0,
    });

    await interaction.reply(`Sala criada: ${channel}`);
  }
});

client.login('SEU_TOKEN_AQUI');
