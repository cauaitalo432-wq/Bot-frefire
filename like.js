const TelegramBot = require('node-telegram-bot-api');

// ==============================================
// 🔑 CONFIGURAÇÕES
// ==============================================
const token = '8649274157:AAF53bChEu4uFtngfj0XX748hAvbYx6x4ns';
const apiKey = 'ff_OH-9t...DHDbuD';
const quantidadeLikes = 200;
const regiao = 'br';

// ==============================================
// 🤖 INICIAR O BOT
// ==============================================
const bot = new TelegramBot(token, { polling: true });

// ==============================================
// 📌 COMANDO /LIKE
// ==============================================
bot.onText(/\/like (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const uid = match[1];

  try {
    const response = await fetch(
      'https://salatwo.squareweb.app/api/bot/add-like' +
      '?key=' + apiKey +
      '&region=' + regiao +
      '&uid=' + uid +
      '&amount=' + quantidadeLikes
    );
    
    const data = await response.json();

    if (data.status === 'success' || data.success === true) {
      bot.sendMessage(chatId, 
`❤️ Likes enviados com sucesso!
🆔 UID: ${uid}
🌎 Região: BRASIL
✅ Quantidade: +${quantidadeLikes} likes`
      );
    } else {
      bot.sendMessage(chatId, '❌ Erro: ' + (data.message || 'Saldo insuficiente ou chave inválida.'));
    }

  } catch (erro) {
    console.error(erro);
    bot.sendMessage(chatId, '❌ Erro no servidor. Tente novamente.');
  }
});

// ==============================================
// 👋 COMANDO /START
// ==============================================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
`🔥 BOT DE LIKES FREE FIRE 🔥

Para usar é muito fácil!
📌 Escreva: /like SEU_UID

Exemplo: /like 1234567890

✅ Likes instantâneos e seguros!`
  );
});

console.log('🤖 Bot de Likes Ligado e Funcionando!');
