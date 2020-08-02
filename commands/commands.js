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
  var generalCommands = "";
  var gamesCommands = "";
  var funCommands = "";
  var giveawayCommands = "";
  var adminCommands = "";
  bot.commands.forEach(command => {
    switch (command.help.type) {
      case "general":
        generalCommands += "`" + command.help.name + "`" + " ";
        break;
      case "games":
        gamesCommands += "`" + command.help.name + "`" + " ";
        break;

      case "fun":
        funCommands += "`" + command.help.name + "`" + " ";
        break;
        case "giveaway":
        giveawayCommands += "`" + command.help.name + "`" + " ";
        break;

      case "admin":
        adminCommands += "`" + command.help.name + "`" + " ";
        break;

      // ignore hidden commands :^)
    }
  });

  let say = message.content.slice(command.length);
  let embed = new Discord.MessageEmbed()
    .setAuthor(`Bot Prefix is "${prefix}"`, Icon[2], url)
    .setColor("#ff1966")
    .addField("General Commands", generalCommands, false)
    .addField("Games Commands", gamesCommands, false)
    .addField("Giveaway Commands", giveawayCommands, false)
    .addField("Fun Commands", funCommands, false)
    .addField("Admin Commands", adminCommands, false);
  message.channel.startTyping();
  setTimeout(() => {
    message.channel.send(embed).then(message => {
      message.channel.stopTyping();
    });
  }, 2000);
};

module.exports.help = {
  name: "cmds",
  type: "general",
  usage: `${prefix}commands`,
  about: "To display list of commands",
  aliases: ["commands"]
};
