const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');
let fs = require(`fs`);
const { MessageAttachment } = require('discord.js');
const {
  Client, Intents, Embed, Embedbuilder, EnumResolvers, GatewayIntendBits, Partials, ApplicationCommandType, ApplicationCommandOptionType, ButtonStyle, Colors, Collection, MessageEmbed, ButtonBuilder
} = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'enum'], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING"],
});
const keep_alive = require('./keep_alive.js')


var secret = process.env

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");
client.events = new Collection();

module.exports = client;

["Command"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args, secret)
});



client.on('messageCreate', async message => {
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const cmd = 'send-logger';
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, secret)
});





//if the server doesn't have a set prefix yet
let prefix = '=';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.guilds.cache.forEach(guild => console.log(`${guild.name}(${guild.id})`));
  let scheduledMessage = new cron.CronJob('00 00 04 * * *', () => {
    const guild = client.guilds.cache.get(process.env.grp2);
    const channel = guild.channels.cache.get(process.env.channelID2);
    channel.send('????????????????????????');
  });
  scheduledMessage.start()
});
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
console.log(hours + ":" + minutes);

const cron = require('cron');


client.setMaxListeners(50)

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


client.on('guildMemberAdd', (member) => {
  try {
    if (member.guild.id == process.env.grp) {
      const channelId = process.env.channelID // The Channel ID you just copied
      try {
        (member.guild.channels.fetch(channelId)).then((channel => {
          if (channel.guild == process.env.grp) {
            channel.send('????????????~')
          }
        }))
      } catch (e) { console.log(e) };
      if (!member.message.author.bot) {
        member.send('??????')
      }
    }
  } catch (e) {
    console.log(e)
  }
});
client.on('guildMemberAdd', (member) => {
  try {
    if (member.guild.id == process.env.grp1) {
      const channelId1 = process.env.channelID1 // The Channel ID you just copied
      try {
        (member.guild.channels.fetch(channelId1)).then((channel1 => {
          if (channel1.guild == process.env.grp1) {
            channel1.send('????????????~')
          }
        }))
      } catch (e) { console.log(e) }
    }
  } catch (e) {
    console.log(e)
  }
});
client.on('guildMemberUpdate', (oldMember, newMember) => { //i.e role(s) were removed
  try {
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
      const newr = (`${oldMember.displayName} ????????? ${removedRoles.map(r => r.name)} ???`);
      console.log(newr);
      const Embed = new MessageEmbed()
        .setTitle('??????????????????~')
        .setDescription(newr)
        .setColor('RANDOM');
      let rolelog = newMember.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'log');
      if (!rolelog) return;
      rolelog.send({ embeds: [Embed] });;
    } //i.e role(s) were added
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
      console.log(`${oldMember.displayName} ????????? ${addedRoles.map(r => r.name)} ???`);
    }
    const newr1 = (`${oldMember.displayName} ????????? ${addedRoles.map(r => r.name)} ???`);
    const Embed1 = new MessageEmbed()
      .setTitle('??????????????????~')
      .setDescription(newr1)
      .setColor('RANDOM');
    let log = newMember.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'log');
    if (!log) return;
    log.send({ embeds: [Embed1] });;
  } catch (e) {
    console.log(e)
  }
});
client.on('messageDelete', function(message) {
  try {
    let deleted = `**???????????????** \n ${message.author.tag} ??? ${message.channel.name} ????????????????????? \n ????????????:  ${message.cleanContent} `
    // post in the server's log channel, by finding the accuratebotlog channel (SERVER ADMINS **MUST** CREATE THIS CHANNEL ON THEIR OWN, IF THEY WANT A LOG)
    let log = message.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'log');
    if (!log) return;
    log.send(deleted)
  } catch (e) { }
})



client.on('messageCreate', (message) => {
  try {
    if (message.author.id === process.env.me) return;
    if (message.content.toLowerCase().includes('???????????') || message.content.toLowerCase().includes('waifu')) {
      message.reply('???')
    }

    if (message.content.toLowerCase().includes('wife')) {
      message.reply('wake up damn');
    }

    if (message.content.toLowerCase().includes('??????')) {
      if (message.member.roles.cache.some(role => role.name == "??????")) return;
      if (message.author.bot) { return; }
      message.reply('????????????');
    }

    if (message.content.toLowerCase().includes('???????????????????????????') || message.content.toLowerCase().includes('????????????????????????????????????') || message.content.toLowerCase().includes('???????????????') || message.content.toLowerCase().includes('?????????') || message.content.toLowerCase().includes('???????????????') || message.content.toLowerCase().includes('?????????')) {
      message.channel.send('???????????????');
    }

    if (message.content.toLowerCase().includes('?????????') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('??????') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???????????????') && message.content.toLowerCase().includes('???')) {
      message.channel.send('???????????????');
    }

    if (message.content.toLowerCase().includes('?????????') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('??????') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????????????????') && message.content.toLowerCase().includes('???')) {
      message.channel.send('???????????????');
    }

    if (message.content.toLowerCase().includes('??????') || message.content.toLowerCase().includes('?????????')) {
      if ((message.guild.id === process.env.grp1) && (message.member.roles.cache.some(role => role.name == "??????"))) return;
      message.channel.send('?????????');
    }

    if (message.content.toLowerCase().includes('??????')) {
      message.reply('https://cdn.discordapp.com/attachments/946997403578404864/957699560967376966/FB_IMG_1643680126724.jpg');
    }

    if (message.content.toLowerCase().includes('pettan')) {
      message.reply('https://cdn.discordapp.com/attachments/946997403578404864/957914419852111922/FB_IMG_1643680110105.jpg');
    }

    if (message.content.toLowerCase().includes('?????????') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('??????') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('?????????') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???')) {
      if (message.guild.id === '942625037498867722') message.channel.send('<#963807692839862352>, ??????')
      else { message.channel.send('<#950398610284097597>, ??????') };
    }

    if (message.content.toLowerCase().includes('????????????') || message.content.toLowerCase().includes('??????')) {
      message.reply('??????????????????<:RushiaYandere:948941963170828328>');
    }

    if (message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???') || message.content.toLowerCase().includes('???') && message.content.toLowerCase().includes('???')) {
      message.channel.send('???');
    }

    if (message.content.toLowerCase().includes('???')) {
      message.reply('https://cdn.discordapp.com/attachments/946997403578404864/957911151394586624/FB_IMG_1638487832614.jpg');
    }

    if ((message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('?????????'))) {
      message.reply('https://cdn.discordapp.com/attachments/946997403578404864/957914420502212698/FB_IMG_1643680054229.jpg');
    }

    if (message.content.toLowerCase().includes('???')) {
      var a = (`https://media.discordapp.net/attachments/956867669959794728/960943560117596221/FB_IMG_1628385959138.jpg`);
      var b = (`???`);
      let n = getRandomNumber(0, 2);
      if (n == 1) {
        message.reply(a);
      }
      else { message.reply(b); }
    }

    if (message.content.toLowerCase().includes('??????')) {
      message.reply('https://media.discordapp.net/attachments/956867669959794728/961972142487007232/Screenshot_20220320-210121_Markup.png').then(msg => {
        setTimeout(() => msg.delete(), 1000);
      })
    }

    if (message.content.toLowerCase().startsWith(`${prefix}dd`)) {
      let x = message.content.split(' ').slice(1);
      try {
        if (message.author.bot) return;
        var status = '?????????';
        message.reply(status + x + '~~?????????????????????DD~~');
      } catch (e) {
        console.log(e)
      }
    }

    if (message.content.toLowerCase().includes('boing')) {
      if (message.content.toLowerCase().includes('not')) return message.reply('??????????????????<:RushiaYandere:948941963170828328>');
      message.reply('https://media.discordapp.net/attachments/956867669959794728/963813505750954054/FB_IMG_1648803227500.jpg');
      message.react('<a:3994rushiahappy:948938443218649090>');
    }
  } catch (e) { console.log(e) }
});





//message edit
client.on('messageUpdate', (oldMessage, newMessage) => { // Old message may be undefined
  if (!oldMessage.author) return; //;
  let log = client.channels.fetch(process.env.log_channel).then(log => {
      log.send(`????????? ${newMessage.guild.name} \n \n ????????? ${newMessage.channel} \n \n ??????${newMessage.author.tag} \n \n ???????????? ${oldMessage} ,???????????? ${newMessage}`);

  })
  let channel = newMessage.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'log');
  if(!channel) return;
    channel.send(`????????? ${newMessage.channel} \n \n ??????${newMessage.author.tag} ???????????? ${oldMessage} ,???????????? ${newMessage}`);
});






//dm detect
client.on('messageCreate', async (message) => {
  try {
    if (message.channel.type !== 'DM')
      return;
    let a = message.author
    const User = client.users.cache.find(user => user.id === a);
    let channel = client.channels.fetch(process.env.PMlog).then(channel => {
      channel.send('???:' + message.author.tag + ', ??????:' + message.content)
    }).catch(err => {
      console.log(err)
    })
  } catch (error) {
    console.error(error);
  }
});







//self protect
client.on('messageCreate', async message => {
  try {
    if (message.reference.messageId) {
      if ((message.content.toLowerCase().includes('???')) || (message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('???')) || (message.content.toLowerCase().includes('???')) || (message.content.toLowerCase().includes('???')) || (message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('??????')) || (message.content.toLowerCase().includes('??????'))) {
        const repliedTo = await message.channel.messages.fetch(message.reference.messageId);
        if (repliedTo.author.id === process.env.botid) {
          message.reply('???')
        };

      }
    }
  } catch (e) { }
});







//self role
client.once('ready', () => {
  let channel = client.channels.fetch('963802334482284595').then(channel => {
    try {
      channel.messages.fetch('963802394045583370').then(message => {
        message.react('<:makaneko_surprise:958407417559908382>')
        const filter = (reaction, user) => {
          return reaction.emoji.name === 'makaneko_surprise';
        };


        const collector = message.createReactionCollector({ filter });


        collector.on('collect', (reaction, user) => {
          const role = message.guild.roles.fetch('964140235401355304');

          message.guild.members.fetch(user.id).then(member => {
            member.roles.add('964140235401355304');
          });
        });
      })
    } catch (e) { console.log(e) }
  })
});


client.login(process.env.token).then(() => {
  client.user.setPresence({ activities: [{ name: '????????????', type: 'WATCHING' }], status: 'idle' });
});
