const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } = require('discord.js');

// === CONFIGURAÇÕES (Preencha aqui com os dados do seu bot) ===
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM3MDkxMDI3MDkxMDYyNTczMTA3NzQ2NjciLCJrZXkiOiI4YWE1NDA0ODI3ZjgyNWE1MDIwNDY5ZDk2ZjM4In0.hOoS_Fwk6ZSPdUAIpPac-MmJhkoGguMjRiWQof7sRTo'; 
const CLIENT_ID = '8139450678:AAELStf3JRzpNkyLElPiIz5cL_vmQFtCg5A'; // Você pega na aba "OAuth2" do portal de desenvolvedor
const GUILD_ID = '1492289527899750421'; // O ID do seu servidor (clique com o botão direito no ícone do servidor)

// === 1. DEFINIÇÃO DO COMANDO /SALA ===
// Isso é o que a sua imagem do GitHub estava tentando adicionar
const commands = [
  {
    name: 'sala',
    description: 'Cria uma sala privada para você',
    // Adicionei opções para você fornecer o ID e a Senha da sala
    options: [
        {
            name: 'id',
            description: 'O ID da sala criada no Free Fire',
            type: 3, // STRING (texto)
            required: true,
        },
        {
            name: 'senha',
            description: 'A senha da sala criada no Free Fire',
            type: 3, // STRING (texto)
            required: true,
        },
    ],
  },
];

// === 2. CRIAÇÃO DO CLIENTE DO BOT ===
// Configuração básica do bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// === 3. FUNÇÃO PARA REGISTRAR OS COMANDOS ===
// Isso usa 'REST' e 'Routes' que foram adicionados na sua imagem
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('⏳ Iniciando a atualização dos comandos de barra (/)...');

    // Registra os comandos especificamente para o seu servidor (aparece instantaneamente)
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('✅ Comandos (/) registrados com sucesso no servidor!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();

// === 4. LÓGICA DE RESPOSTA AO COMANDO ===

client.on('ready', () => {
  console.log(`🤖 Bot Free Fire Online como ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  // Verifica se a interação é um comando de chat (/)
  if (!interaction.isChatInputCommand()) return;

  // Lógica para o comando /sala
  if (interaction.commandName === 'sala') {
    // Pega os dados digitados pelo usuário (/sala id:123 senha:abc)
    const idSala = interaction.options.getString('id');
    const senhaSala = interaction.options.getString('senha');

    // Cria uma mensagem bonita e organizada (Embed)
    const salaEmbed = new EmbedBuilder()
        .setColor(0xFFA500) // Cor Laranja (Free Fire style)
        .setTitle('🎮 DADOS DA SALA PRIVADA LIBERADOS!')
        .setDescription(`⚠️ Atenção jogadores! O administrador disponibilizou os dados de acesso para a próxima partida. Entrem rápido!`)
        .addFields(
            { name: '🆔 ID da Sala', value: `\`${idSala}\``, inline: true },
            { name: '🔑 Senha', value: `\`${senhaSala}\``, inline: true },
        )
        .setThumbnail('https://i.imgur.com/AfFp7pu.png') // Uma imagem padrão do Free Fire (opcional)
        .setTimestamp()
        .setFooter({ text: 'Bom jogo a todos! — Sistema Automatizado', iconURL: client.user.displayAvatarURL() });

    // Envia a mensagem no chat
    await interaction.reply({ embeds: [salaEmbed] });
  }
});

// === 5. INICIA O BOT ===
// Conecta o bot ao Discord usando o seu Token
client.login(MTQ5MTgzNzU2Mjc5OTc4ODA3Mg.GLk5I2.8MIX4W-hGusNJt4aydTRffWgUwdgZeaHxDROZw);
