const Discord = require("discord.js");
const config = require("./../config.json");
const prefix = config.prefix;
const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://pcgameson.com/fortrex"
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
  let topGames = "";
  let getPage = message.content.slice(command.length);
  function notNull(){

    if(getPage === ""){
    return '1';
    }else if(getPage !== ""){
    return getPage;
    }
    }

  axios
    .get(
      `http://pcgameson.com/category/news/page/${notNull()}`
    )
    .then(response => {
      // Load the web page source code into a cheerio instance
      const Loader = cheerio.load(response.data);

      // The pre.highlight.shell CSS selector matches all `pre` elements
      // that have both the `highlight` and `shell` class
      const urlElems = Loader("main#cb-main .cb-bs");

      // We now loop through all the elements found
      for (let i = 0; i < 5; i++) {
        const urlSpan = Loader(urlElems[i]).find(".title a")[0];
        const ratingSpan = Loader(urlElems[i]).find(
          "a"
        )[0];

        if (urlSpan) {
          const urlText = Loader(urlSpan).text();
          const score = Loader(urlSpan).attr("href");
          let embed = new Discord.MessageEmbed();
          let gameList =
            `** #${i + 1}:  ${urlText} **\n    ` +
            `[click here to view](${score})`;
          let gameArr = gameList;
          topGames += `\n${gameArr}`;
          let counter = i + 1;
          console.log(
            "working"
          );
          console.log(urlText);
        }
      }
      let gameEmbed = new Discord.MessageEmbed()
        .setColor("#ff2962")
        .setAuthor(
        `🔥Latest Game News🔥 `
        // "https://www.vertigozorbing.co.uk/wp-content/uploads/2018/02/Channel-5-New-Logo-300x300.jpg"
      )
        .setDescription(`${topGames}`)
        .setFooter(`Displaying data from its API @${bot.user.username} [Page: ${notNull()}/20]`)
        
      message.channel.startTyping();

      setTimeout(() => {
        message.channel.send(gameEmbed).then(message => {
          message.channel.stopTyping();
        });
      }, 2000);
    });
  // if(msg === ''){
  //   let embed = new Discord.Richembed()
  //   .setColor('#ff1966')
  //   .setAuthor(`Please specify the platform!`, Icon[2], url)
  //   .setDescription(`**Example:** ${prefix}topgames pc\n**Platforms:**pc xboxone ps4 wii stadia ` );
  //   return message.reply(embed)
  // }
};

module.exports.help = {
  name: "news",
  type: "general",
  usage: '`' + `${prefix}` + 'news [page_number]`',
  about: 'To display game news, blogs',
  aliases: [""]
};
