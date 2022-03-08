exports.run = async (client, message, args) => {
  const { MessageEmbed } = require("discord.js-12");
  const DiscordPages = require("discord-pages");
  const db = require("quick.db");
  const argsall = message.content.split(" ").slice(1).join(" ");
  let author_id = message.author.id;
  let articles = [
    {
      name: "🎈 Upgrade Slots",
      price: 80,
    },
    {
      name: "🔮 Boost Xp (1h)",
      price: 120,
    },
  ];

  console.log(argsall);
  if (!argsall || isNaN(parseInt(argsall) + parseInt(argsall)))
    return message.channel.send(
      "❌ Veuillez préciser le nombre de l'article que vous souhaitez acheter"
    );

  let buying;
  articles.forEach((art) => {
    if (articles.indexOf(art) === parseInt(argsall)) {
      buying = art;
    }
  });

  if (!buying)
    return message.channel.send("❌ Aucun article correspond à ce nombre");

  let clan;
  message.guild.members.cache.forEach((m) => {
    if (db.get(author_id + ".clan")) clan = db.get(author_id + ".clan");
    if (!db.get(m.user.id + ".clan.members")) return;
    if (db.get(m.user.id + ".clan.members").includes(author_id)) {
      clan = db.get(m.user.id + ".clan");
    }
  });

  if (!clan) return message.channel.send("❌ Vous n'avez pas de clan");
  if (clan.coins < buying.price)
    return message.channel.send(
      "❌ Vous n'avez pas assez d'argent, il vous manque `" +
        (buying.price - clan.coins) +
        "` <:1824_coin:882638703728668752>"
    );

  if (
    argsall === "0" &&
    (db.get(clan.owner + ".clan.slots")
      ? db.get(clan.owner + ".clan.slots")
      : 5) > 14
  )
    return message.channel.send(
      "❌ Vous avez attend le nombre maximum de slot dans un clan"
    );
  //if (argsall === "1" && clan.boost.enable) return message.channel.send('❌ Vous avez déjà un boost en cours')

  switch (parseInt(argsall)) {
    case 0:
      clan.slots
        ? db.add(clan.owner + ".clan.slots", 1)
        : db.set(clan.owner + ".clan.slots", 6);
      db.get(clan.owner + ".clan.coins")
        ? db.subtract(clan.owner + ".clan.coins", buying.price)
        : db.set(clan.owner + ".clan.coins", 0);
      message.channel.send(
        "<:5040discordcheck:921760140179431435> Votre nombre de slots à augmenté, vous avez maintenant `" +
          db.get(clan.owner + ".clan.slots") +
          "` slots."
      );
      break;
    case 1:
      db.get(clan.owner + ".clan.boost.enable")
        ? db.add(clan.owner + ".clan.boost.time", 3600000)
        : db.set(clan.owner + ".clan.boost", {
            starttime: message.editedTimestamp || message.createdTimestamp,
            enable: true,
            time: 3600000,
          });
      db.get(clan.owner + ".clan.coins")
        ? db.subtract(clan.owner + ".clan.coins", buying.price)
        : db.set(clan.owner + ".clan.coins", 0);
      message.channel.send(
        "<:5040discordcheck:921760140179431435> Vous venez d'acheter un boost de `1h`"
      );
      break;
  }
};
