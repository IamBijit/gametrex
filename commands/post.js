const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let Prefix = config.prefix;
    let cmd = Prefix + module.exports.help.name + 1;
    let tagCmd = message.content.slice(cmd.length);
    if (!message.content.startsWith(Prefix)) return;

    const p = await message.channel.send("Hold on .....")

    // if (message.content.startsWith(tagCmd)) {
    const splitArgs = tagCmd.split(' ');
    const tagName = splitArgs.shift();
    const isImage = tagName.endsWith('.jpg') || tagName.endsWith('.png');
    const tagDescription = splitArgs.join(' ');
    const post = new Discord.MessageEmbed()
        .setColor("#fc0f6a")
        .setImage(tagName)
        .setDescription(tagDescription)
    p.edit(post);
    message.delete();
    // if(isImage) return message.reply('Invalid image url?');
    

};

module.exports.help = {
    name: "post",
    type: "general",
    usage:"post <image_url> <post_content>",
    about: "To make a post embed with image",
    aliases: [""]
}