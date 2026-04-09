const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

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

// CÓDIGO PARA REGISTRAR O COMANDO /sala
const commands = [
  {
    name: 'sala',
    description: 'Cria uma sala privada para você',
  }
];

const rest = new REST({ version: '10' }).setToken('MTQ5MTgzNzU2Mjc5OTc4ODA3Mg.GlBSts.Bd0LMtqEL5J9AiHXoYv72Gylrr8Ahhl44Y_TMc');

(async () => {
  try {
    console.log('Registrando comandos...');

    await rest.put(
      Routes.applicationCommands('1491837562799788072'),
      { body: commands }
    );

    console.log('Comando /sala registrado com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();

client.login('MTQ5MTgzNzU2Mjc5OTc4ODA3Mg.GlBSts.Bd0LMtqEL5J9AiHXoYv72Gylrr8Ahhl44Y_TMc');
