exports.run = async (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  const argsall = message.content.split(" ").slice(1).join(" ");

  if (!argsall)
    return message.channel.send("❌ Erreur syntax : `!create <nom>`");

  verif2 = false;
  message.guild.members.cache.forEach((m) => {
    if (!db.get(m.user.id + ".clan.members")) return;
    if (db.get(m.user.id + ".clan.owner") === author_id)
      return (verif2 = "owner");
    if (db.get(m.user.id + ".clan.members").includes(author_id)) {
      verif2 = true;
    }
  });

  if (verif2 === true)
    return message.channel.send("❌ Vous faites déjà parti d'un clan");
  if (verif2 === "owner")
    return message.channel.send("❌ Vous êtes déjà le propriétaire d'un clan");
  verif = false;
  message.guild.members.cache.forEach((m) => {
    if (!db.get(m.user.id + ".clan")) return;
    if (db.get(m.user.id + ".clan.name") === argsall) {
      verif = true;
    }
  });

  if (verif === true)
    return message.channel.send("❌ Un clan existant a déjà ce nom");
  if (argsall.length > 20)
    return message.channel.send("❌ Veuillez préciser un nom moins long.");
  const embed = new Discord.MessageEmbed()
    .setAuthor("🔧 | Création Clan")
    .setDescription(
      "Voulez-vous vraiment créer un clan avec comme nom : `" + argsall + "`"
    )
    .setFooter("© Clan Wars 2021", message.guild.iconURL);
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
            let role;
            if (
              message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Bravery"
              )
            ) {
              role = message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Bravery"
              );
            } else if (
              message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Brilliance"
              )
            ) {
              role = message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Brilliance"
              );
            } else if (
              message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Balance"
              )
            ) {
              role = message.member.roles.cache.find(
                (r) => r.name === "HypeSquad Balance"
              );
            }

            if (!role)
              return message.channel.send(
                "❌ Veuillez rejoindre une hypesquad avant de créer un clan"
              );
            m.delete().catch(() => {});
            db.set(message.author.id + ".clan", {
              name: argsall,
              members: [message.author.id],
              points: 0,
              coins: 0,
              hypesquad: role ? role.name : "Aucune",
              owner: message.author.id,
              rank: {
                name: "Bois",
                value: 0,
                color: "a85420",
                icon:
                  "https://cdn.discordapp.com/attachments/685384232293498947/880006340590833694/rank-bois.png",
              },
            });
            message.channel.send(
              "<:5040discordcheck:921760140179431435> Vous venez de créer votre clan"
            );
            break;
          case "❌":
            m.delete().catch(() => {});
            message.channel.send("❌ Création du clan annulée.");
            break;
        }
      });
    });
  });
};
