const ms = require('ms');
const config = require('../config.json');
const prefix = config.prefix;
exports.run = async (bot, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    // Start the giveaway
    bot.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
      // Messages
        messages: {
            giveaway: (bot.config.everyoneMention ? "@everyone\n" : "")+":fire: **GIVEAWAY STARTED** :fire:",
            giveawayEnded: (bot.config.everyoneMention ? "@everyone\n\n" : "")+":fire: **GIVEAWAY ENDED** :fire:",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🔥 to participate!",
            winMessage: "GG, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

};
module.exports.help = {
    name: "start-giveaway",
    type: "giveaway",
    usage: "`start-giveaway <channel> <duration> <winners> <prize> `\n"+
    `Example: ${prefix}start-giveaway #gifts 3d 2 Pizza `,
    about: "To make or the start a giveaway!!  ",
    aliases: [""]
  };
