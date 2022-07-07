module.exports = {
    name: "say", 
    aliases: ["s"],
    run: async(client, message, args, secret) => {
        try {
            if (((message.guild.id === secret.grp1) && (message.member.roles.cache.some(role => role.name == "test") || message.member.roles.cache.some(role => role.name == "元首") || message.member.roles.cache.some(role => role.name == "管理員") || message.member.roles.cache.some(role => role.name == "神志不清的天才寶特瓶") )) || ((message.guild.id === secret.grp) && (message.member.roles.cache.some(role => role.name == "大哥") || message.member.roles.cache.some(role => role.name == "管理員") ))) {
              var q = message.content.substring(4,);
              message.channel.send(q);
              
              message.delete()
            }
          } catch (e) {
            console.log(e)
          }
    }
  }