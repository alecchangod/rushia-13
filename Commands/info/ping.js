module.exports = {
    name: "ping", 
    aliases: ["p"],
    run: async(client, message, args) => {
  var yourping = new Date().getTime() - message.createdTimestamp
  var botping = Math.round(client.ws.ping)
  
  message.channel.send(`Your ping: ${yourping} \nBots ping: ${botping}`)
    }
  }