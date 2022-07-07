module.exports = {
    name: "send-logger", 
    aliases: ["s"],
    run: async (client, message, secret) => {
        try{

        process.setMaxListeners(50)
        process.on('unhandledRejection', err => {

          var channel = client.channels.fetch('994459707580358656').then(channel => {
            channel.send(`Unhandled Promise Rejection: ${err.message}`);
          })
          });

    if (message.channel.id === secret.log_channel) return;
    if (message.channel.id === '994459707580358656') return;
    var channel = client.channels.fetch(secret.log_channel).then(channel => {
      if(message.stickers.size > 0) {channel.send('人:' + message.author.tag + ' , 訊息: 啊就貼圖(X , 群:' + message.guild.name + ' , 頻道:' + message.channel.name, { split: true })}

      else if (message.attachments.size > 0) {
        var attachments = message.attachments;
        for (let file of attachments) {
          message.attachments.forEach(a=>{
                  if (a.size > 10485760) {
                    if (message.content.length == 0) var data = `人: ${message.author.tag} , 群: ${message.guild.name} , 頻道: ${message.channel.name} , 附件: ${a.url}`
                    else if (message.content.length > 0) var data = `人: ${message.author.tag} , 訊息: ${message.content} , 群: ${message.guild.name} , 頻道: ${message.channel.name} , 附件: ${a.url}`
            var channel1 = client.channels.fetch(secret.log_channel).then(channel1 => {
            channel1.send({
              content: data
            });
          });
          }
          else var channel1 = client.channels.fetch(secret.log_channel).then(channel1 => {
            if (message.content.length == 0) var data = `人: ${message.author.tag} , 群: ${message.guild.name} , 頻道: ${message.channel.name} , 附件:`
            else if (message.content.length > 0) var data = `人: ${message.author.tag} , 訊息: ${message.content} , 群: ${message.guild.name} , 頻道: ${message.channel.name} , 附件:`
            channel1.send({
              files: Array.from(message.attachments.values()),
              content: data
            });
          });
          })
    
        }
      }

      else if ((message.embeds[0]) && (message.embeds[0].description) ) {
      // check to ensure message was sent by bot and contains embed
      
      const receivedEmbed = message.embeds[0];
      const exampleEmbed = new Discord.MessageEmbed(receivedEmbed).setTitle('New title');
      let channel = client.channels.fetch(secret.log_channel).then(channel => {
        channel.send({ embeds: [receivedEmbed] })
      }).catch(err => {
        console.log(err)
      })
    }


      else  {
        const repliedTo = message.channel.messages.fetch(message.reference.messageId);
        if (!repliedTo) { channel.send('人:' + message.author.tag + '訊息: ' + message.content + ' , 群:' + message.guild.name + ' , 頻道:' + message.channel.name, { split: true }) }
        else channel.send('人:' + message.author.tag + ' , 前文(?: ' + repliedTo.author.tag + '\n ' + repliedTo.content + '訊息: ' + message.content + ' , 群:' + message.guild.name + ' , 頻道:' + message.channel.name, { split: true })
    } 
  
  }  
  )} catch(error) {console.log(error)}
}
}