const Discord = require("discord.js");
const botconfig = require("./../config.json");
const prefix = botconfig.prefix;
const url = botconfig.url;
const Icon = [
  "",
  "https://i.imgur.com/NyQucPe.png",
  "https://i.imgur.com/BsczYnp.png",
  "https://i.imgur.com/WFRpoGL.png"
];
module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(prefix)) return;

  

  let command = prefix + module.exports.help.name + 1;
  let msg = message.content.slice(command.length);

  var cmdName = args[1];
  bot.commands.forEach(command => {
    if (msg === command.help.name) {
      var embed = new Discord.MessageEmbed()
      .setAuthor(`My current prefix is "${prefix}"`, Icon[2], url)
        .setColor(botconfig.primary)
        // .setTitle(`${command.help.name}`)
        .setDescription(`**Usage:** ${command.help.usage}\n**Description:** ${command.help.about}`);
      message.channel.send(embed);
    }
  });
   
  if (msg === "") {
    let embed = new Discord.MessageEmbed()
      .setColor(botconfig.primary)
      .setAuthor("Please specify a valid command!", Icon[1], url)
      .setDescription(" To display commands list - `"+ prefix+ "commands`");

    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "command",
  type:"admin",
  usage:"`command [command]`",
  about:"Learn about a command",
  aliases: [""]
};
