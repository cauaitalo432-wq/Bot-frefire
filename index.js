const { Telegraf } = require('telegraf');

// === CONFIGURAÇÃO ===
// Coloque aqui o Token que você pegou com o @BotFather
const TOKEN = '8139450678:AAELStf3JRzpNkyLElPiIz5cL_vmQFtCg5A'; 
const bot = new Telegraf(TOKEN);

// === COMANDO /SALA ===
bot.command('sala', (ctx) => {
    const mensagem = ctx.message.text.split(' ');
    
    // Verifica se o usuário enviou o ID e a Senha
    if (mensagem.length < 3) {
        return ctx.reply('❌ Erro! Use: /sala ID SENHA');
    }

    const idSala = mensagem[1];
    const senhaSala = mensagem[2];

    // Apaga a mensagem do usuário para ninguém ver quem mandou (precisa ser admin)
    try {
        ctx.deleteMessage();
    } catch (e) {
        console.log("Não consegui apagar a mensagem. O bot é admin?");
    }

    const resposta = 
        "🎮 **SALA DE FREE FIRE LIBERADA** 🎮\n\n" +
        `🆔 ID: \`${idSala}\`\n` +
        `🔑 SENHA: \`${senhaSala}\`\n\n` +
        "👉 Entre rápido e boa sorte!";

    ctx.replyWithMarkdownV2(resposta.replace('.', '\\.').replace('-', '\\-'));
});

// Inicia o Bot
bot.launch();
console.log("🤖 Bot do Telegram Online!");

// Lida com paradas do sistema
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
