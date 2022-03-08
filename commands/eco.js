exports.run = async (client, message, args) => {
  var Discord = require("discord.js-12");
  const { updaterank } = require("../handler/functions.js");
  const argsall = message.content.split(" ").slice(1).join(" ");
  const db = require("quick.db");
  let author_id = message.author.id;
  let member = message.mentions.members.first();

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("❌ Vous n'avez pas la permission");

  if (args[0] === "add") {
    if (!member)
      return message.channel.send("❌ Veuillez mentionner un membre");
    if (!args[2]) return message.channel.send("❌ Veuillez préciser la somme");
    if (!Number.isInteger(parseInt(args[2])))
      return message.channel.send("❌ Veuillez préciser une somme correct");
    if (db.get(member.user.id + ".clan") == undefined) {
      return message.channel.send(
        "❌ Cette personne n'est pas le propriétaire de son clan"
      );
    } else {
      if (!db.get(member.user.id + ".clan.coins"))
        db.set(member.user.id + ".clan.coins", 0);
      db.add(member.user.id + ".clan.coins", parseInt(args[2]));
    }
    message.channel.send(
      "<:5040discordcheck:921760140179431435> `" +
        args[2] +
        " coins` ont été ajouté au clan `" +
        db.get(member.user.id + ".clan.name") +
        "`."
    );
  } else if (args[0] === "remove") {
    if (!member)
      return message.channel.send("❌ Veuillez mentionner un membre");
    if (!args[2]) return message.channel.send("❌ Veuillez préciser la somme");
    if (!Number.isInteger(parseInt(args[2])))
      return message.channel.send("❌ Veuillez préciser une somme correct");
    if (!db.get(member.user.id + ".clan.coins")) {
      message.channel.send(
        "<:5040discordcheck:921760140179431435> `" +
          args[2] +
          " coins` ont été retiré au clan `" +
          db.get(member.user.id + ".clan.name") +
          "`."
      );
      db.set(member.user.id + ".clan.coins", 0);
      return;
    } else if (db.get(member.user.id + ".clan.coins") >= parseInt(args[2]))
      db.subtract(member.user.id + ".clan.coins", parseInt(args[2]));
    else return message.channel.send("❌ Ce clan n'a pas assez de coins.");

    message.channel.send(
      "<:5040discordcheck:921760140179431435> `" +
        args[2] +
        " coins` ont été retiré au clan `" +
        db.get(member.user.id + ".clan.name") +
        "`."
    );
  } else if (args[0] === "reset") {
    if (!member)
      return message.channel.send("❌ Veuillez mentionner un membre");
    db.set(member.user.id + ".clan.coins", 0);

    message.channel.send(
      "<:5040discordcheck:921760140179431435> Les coins du clan `" +
        db.get(member.user.id + ".clan.name") +
        "` ont été réinitialisé."
    );
  } else
    return message.channel.send(
      "❌ Veuillez préciser un argument (`add/remove/reset`)"
    );
};
