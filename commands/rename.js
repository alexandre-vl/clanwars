exports.run = (client, message, args) => {
  var Discord = require("discord.js");
  const db = require("quick.db");
  let author_id = message.author.id;

  const argsall = message.content.split(" ").slice(1).join(" ");
  if (!argsall)
    return message.channel.send("❌ Erreur syntax : !rename `<nom>`");
  if (argsall.length > 20)
    return message.channel.send("❌ Veuillez préciser un nom moins longue");

  let owner = false;
  verif = false;
  message.guild.members.cache.forEach((m) => {
    if (db.get(author_id + ".clan")) verif = true;
    if (!db.get(m.user.id + ".clan")) return;
    if (db.get(m.user.id + ".clan.members").includes(author_id)) {
      verif = true;
      owner = db.get(m.user.id + ".clan.owner");
    }
  });

  if (verif === false)
    return message.channel.send("❌ Vous n'êtes dans aucun clan");
  if (owner !== author_id)
    return message.channel.send(
      "❌ Vous n'êtes pas le propriétaire de votre clan"
    );
  if (argsall === db.get(author_id + ".clan.name"))
    return message.channel.send(
      "❌ Ce nom est déjà le nom actuel de votre clan"
    );

  if (
    !db.get(author_id + ".clan.coins") ||
    db.get(author_id + ".clan.coins") < 30
  )
    return message.channel.send(
      "❌ Vous n'avez pas assez d'argent pour renommer votre clan (`30 coins`)"
    );

  const embed = {
    embed: {
      author: { name: "✒️ | Rename Clan" },
      description:
        "Voulez-vous vraiment renommer votre clan en `" +
        argsall +
        "` ?\nCela vous coutera `30`<:1824_coin:882638703728668752>",
      footer: { text: "© Clan Wars 2021", icon_url: message.guild.iconURL },
    },
  };

  message.channel.send(embed).then((m) => {
    m.react("✅");
    m.react("❌").then((r) => {
      const collector = m.createReactionCollector(
        (reaction, user) =>
          ["✅", "❌"].includes(reaction.emoji.name) && user.id === author_id,
        { time: 120000 }
      );

      collector.on("collect", async (reaction) => {
        reaction.users.remove(author_id);

        switch (reaction.emoji.name) {
          case "✅":
            m.delete().catch(() => {});
            db.subtract(author_id + ".clan.coins", 30);
            db.set(author_id + ".clan.name", argsall);

            message.channel.send(
              "<:5040discordcheck:921760140179431435> Vous avez rennomer votre clan en : `" +
                argsall +
                "`"
            );
            break;
          case "❌":
            m.delete().catch(() => {});
            message.channel.send("❌ Action annulée.");
            break;
        }
      });
    });
  });
};
