module.exports = {
    name: "tl", 
    aliases: ["t"],
    run: async(client, message, args) => { 
        const translate = require('@vitalets/google-translate-api');
        process.on('unhandledRejection', err => {

            var channel = client.channels.fetch('994459707580358656').then(channel => {
              channel.send(`Unhandled Promise Rejection: ${err.message}`);
            })
            });
        message.reply('loading').then((msg) => {
        var trantext = ""
        let text = message.content.split(" ");
        let trans = text[1];
        var trantext = text[1];
        translate(trantext, { to: 'zh-TW' }).then(res => {
          msg.edit(`原語言：${res.from.language.iso} \n 譯文： ${res.text} \n ||沒錯就是Google渣翻||`)
        }).catch(err => {
          console.error(err);
        }) 
    }
        )
         
  }
}