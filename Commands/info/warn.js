module.exports = {
    name: "warn", 
    aliases: ["w"],
    run: async(client, message, args, secret) => {
        try {
              if (!message.member.permissions.has('TIMEOUT_MEMBERS')) return message.channel.send("笑死你沒權限")
              if (message.author.bot) return message.reply("你是不會用自己賬號打嗎")
              const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
              let reason0 = message.content.split(">");
              let reason1 = reason0[1]
              if (reason1.length == 0) var reason = ('欸我不知道');
              if (!reason1.length == 0) var reason = reason1;
              if (!member) return message.reply("阿你到底要我禁誰")
              if (member.permissions.has('ADMINISTRATOR')) return message.reply('管管怎麽禁言')
              member.timeout(10 * 6 * 5 * 1000)
              message.channel.send("<@" + member + ">" + "誰讓你在這裡廢話？滾, 5分鐘後再回來（X")
                .catch(console.log);
              if (message.guild.id === secret.grp) {
                let channel = client.channels.fetch(secret.warn).then(channel => {
                  channel.send('人:<@' + member + '>' + '\n原因:' + reason + '\n時間: 5分鐘')
                }).catch(err => { console.log(err) });
              };
              if (message.guild.id === secret.grp1) {
                let channel = client.channels.fetch(secret.warn1).then(channel => {
                  channel.send('人:<@' + member + '>' + '\n原因:' + reason + '\n時間: 5分鐘')
                }).catch(err => { console.log(err) })
              };
          } catch (e) {
            console.log(e)
          }
    }
  }