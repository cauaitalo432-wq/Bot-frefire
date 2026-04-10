const TelegramBot = require('node-telegram-bot-api');

// ==============================================
// 🔑 CONFIGURAÇÕES
// ==============================================
const token = 'SEU_TOKEN_DO_TELEGRAM_AQUI'; // Coloque o token do seu bot
const apiKey = 'SUA_CHAVE_DA_API_AQUI';     // Coloque a chave que você usa nas salas
const quantidadeLikes = 100;                // Quantidade de likes que vai ser enviada
const regiao = 'br';                        // br = Brasil, ind = India, us = USA

// ==============================================
// 🤖 INICIAR O BOT
// ==============================================
const bot = new TelegramBot(token, { polling: true });

// ==============================================
// 📌 COMANDO /LIKE
// ==============================================
bot.onText(/\/like (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const uid = match[1]; // Pega o UID que o usuário digitou

  try {
    // Chamando a API para adicionar likes
    const response = await fetch(
      `https://salatwo.squareweb.app/api/bot/add-like` +
      `?key=${apiKey}` +
      `&region=${regiao}` +
      `&uid=${uid}` +
      `&amount=${quantidadeLikes}`
    );
    
    const data = await response.json();

    // Verifica se deu certo
    if (data.status === 'success' || data.success === true) {
      bot.sendMessage(chatId, 
`❤️ Likes enviados com sucesso!
🆔 UID: ${uid}
🌎 Região: ${regiao.toUpperCase()}
✅ Quantidade: +${quantidadeLikes} likes`
      );
    } else {
      bot.sendMessage(chatId, '❌ Erro: ' + (data.message || data.error || 'Verifique sua chave API ou saldo.'));
    }

  } catch (erro) {
    console.error(erro);
    bot.sendMessage(chatId, '❌ Erro no servidor. Tente novamente mais tarde.');
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

✅ Likes instantâneos e seguros!
⚡ Servidor: Seven Salas`
  );
});

console.log('🤖 Bot de Likes Ligado e Funcionando!');
