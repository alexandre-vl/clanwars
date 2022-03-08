exports.run = async (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  var word_finder = require("close-word");
  const argsall = message.content.split(" ").slice(1).join(" ");
  let mentionned = message.mentions.members.first() || argsall;

  if (mentionned) {
    let clan;
    let users_name = [];

    if (mentionned.user) mentionned = mentionned.user.username;
    message.guild.members.cache.forEach((e) =>
      users_name.push(e.user.username)
    );

    var result = word_finder.findClosestOne(mentionned, users_name).word;
    let mention = await message.guild.members.cache.find(
      (m) => m.user.username === result
    );

    message.guild.members.cache.forEach((m) => {
      if (db.get(mention.user.id + ".clan"))
        clan = db.get(mention.user.id + ".clan");
      if (!db.get(m.user.id + ".clan.members")) return;
      if (db.get(m.user.id + ".clan.members").includes(mention.user.id)) {
        clan = db.get(m.user.id + ".clan");
      }
    });

    let role;
    if (mention.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
      role = mention.roles.cache.find((r) => r.name === "HypeSquad Bravery");
    } else if (
      mention.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
    ) {
      role = mention.roles.cache.find((r) => r.name === "HypeSquad Brilliance");
    } else if (
      mention.roles.cache.find((r) => r.name === "HypeSquad Balance")
    ) {
      role = mention.roles.cache.find((r) => r.name === "HypeSquad Balance");
    }

    let totalSeconds = db.get(mention.user.id + "_voicetimer");
    let day = Math.floor(totalSeconds / 86400);
    let hour = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minute = Math.floor(totalSeconds / 60);
    let second = totalSeconds % 60;

    const embed = new Discord.MessageEmbed()
      .setTitle("🎈 | Informations Membre")
      .setAuthor(
        mention.user.tag,
        mention.user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor("ed1111")
      .addField(
        "<:7857blurplehastag:882654911425286244> Nom :",
        "`" + mention.user.username + "`"
      )
      .addField(
        "<:hypesquad:882644525753962507> HypeSquad :",
        "`" + (role ? role.name.replace("HypeSquad ", "") : "Aucune") + "`"
      )
      .addField(
        "<:4129_Noble_Team:882640395496992818> Clan :",
        "`" + (clan ? clan.name : "Aucun") + "`"
      )
      .addField(
        "<:4202firstmessageart:921757214446845963> Messages :",
        "`" +
          (db.get(mention.user.id + "_messagesCounter")
            ? db.get(mention.user.id + "_messagesCounter")
            : "Aucun") +
          "`"
      )
      .addField(
        "<:6770discordvoicefromvega:921757214383964211> Vocaux :",
        "`" +
          (db.get(mention.user.id + "_voicetimer")
            ? `${day}j ${hour}h ${minute}m et ${second}s`
            : "Aucun") +
          "`"
      )
      .setFooter("© Clan Wars 2021", message.guild.iconURL);
    message.channel.send(embed);
  } else {
    let clan;
    let user = message.guild.members.cache.get(message.author.id);

    verif = false;
    message.guild.members.cache.forEach((m) => {
      if (db.get(author_id + ".clan")) clan = db.get(author_id + ".clan");
      if (!db.get(m.user.id + ".clan.members")) return;
      if (db.get(m.user.id + ".clan.members").includes(author_id)) {
        clan = db.get(m.user.id + ".clan");
      }
    });

    let role;
    if (user.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
      role = user.roles.cache.find((r) => r.name === "HypeSquad Bravery");
    } else if (
      user.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
    ) {
      role = user.roles.cache.find((r) => r.name === "HypeSquad Brilliance");
    } else if (user.roles.cache.find((r) => r.name === "HypeSquad Balance")) {
      role = user.roles.cache.find((r) => r.name === "HypeSquad Balance");
    }

    let totalSeconds = db.get(author_id + "_voicetimer");
    let day = Math.floor(totalSeconds / 86400);
    let hour = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minute = Math.floor(totalSeconds / 60);
    let second = totalSeconds % 60;

    const embed = new Discord.MessageEmbed()
      .setTitle("🎈 | Informations Membre")
      .setAuthor(
        user.user.tag,
        user.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setColor("ed1111")
      .addField(
        "<:7857blurplehastag:882654911425286244> Nom :",
        "`" + user.user.username + "`"
      )
      .addField(
        "<:hypesquad:882644525753962507> HypeSquad :",
        "`" + (role ? role.name.replace("HypeSquad ", "") : "Aucune") + "`"
      )
      .addField(
        "<:4129_Noble_Team:882640395496992818> Clan :",
        "`" + (clan ? clan.name : "Aucun") + "`"
      )
      .addField(
        "<:4202firstmessageart:921757214446845963> Messages :",
        "`" +
          (db.get(author_id + "_messagesCounter")
            ? db.get(author_id + "_messagesCounter")
            : "Aucun") +
          "`"
      )
      .addField(
        "<:6770discordvoicefromvega:921757214383964211> Vocaux :",
        "`" +
          (db.get(author_id + "_voicetimer")
            ? `${day}j ${hour}h ${minute}m et ${second}s`
            : "Aucun") +
          "`"
      )
      .setFooter("© Clan Wars 2021", message.guild.iconURL);
    message.channel.send(embed);
  }
};
