exports.run = async (client, message, args) => {
  var Discord = require("discord.js");
  const db = require("quick.db");
  let author_id = message.author.id;
  let member = message.mentions.members.first();

  const argsall = message.content.split(" ").slice(2).join(" ");
  if (!member)
    return message.channel.send("❌ Erreur syntax : !kick `@membre`");
  if (member.user.id === author_id)
    return message.channel.send("❌ Vous ne pouvez pas vous kick vous même");

  let logchannel = message.guild.channels.cache.find(
    (c) => c.id === "846695473326456843"
  );

  let owner = false;
  verif = false;
  message.guild.members.cache.forEach((m) => {
    if (db.get(author_id + ".clan")) verif = true;
    if (!db.get(m.user.id + ".clan.members")) return;
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

  if (!db.get(author_id + ".clan.members").includes(member.user.id))
    return message.channel.send("❌ Cette personne n'est pas dans votre clan");

  let role;
  if (message.member.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
    role = message.member.roles.cache.find(
      (r) => r.name === "HypeSquad Bravery"
    );
  } else if (
    message.member.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
  ) {
    role = message.member.roles.cache.find(
      (r) => r.name === "HypeSquad Brilliance"
    );
  } else if (
    message.member.roles.cache.find((r) => r.name === "HypeSquad Balance")
  ) {
    role = message.member.roles.cache.find(
      (r) => r.name === "HypeSquad Balance"
    );
  }

  if (!argsall)
    return message.channel.send("❌ Veuillez préciser la raion du kick");
  if (argsall.length > 60)
    return message.channel.send("❌ Veuillez préciser une raison moins longue");
  let embed = {
    embed: {
      author: { name: "💥 | Confirmation Kick" },
      description:
        "Voulez-vous vraiment kicker `" + member.user.tag + "` de votre clan ?",
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

            let listmembers = db.get(owner + ".clan.members");
            const index = listmembers.indexOf(member.user.id);
            listmembers.splice(index, 1);

            db.set(owner + ".clan.members", listmembers);

            let invitation = {
              embed: {
                author: { name: "📌 | Informations" },
                description:
                  "Vous avez été kick du clan de `" +
                  message.author.tag +
                  "`\nRaison : `" +
                  argsall +
                  "`",
                footer: {
                  text: "© Clan Wars 2021",
                  icon_url: message.guild.iconURL,
                },
              },
            };

            member.send(invitation);
            message.channel.send("💥 Membre kick avec succès !");

            logchannel.send({
              embed: {
                author: { name: "🔱 | Logs" },
                description: "Kick Clan",
                fields: [
                  {
                    name: "Membre :",
                    value: "`" + member.user.tag + "`",
                    inline: true,
                  },
                  {
                    name: "Raison :",
                    value: "`" + argsall + "`",
                    inline: true,
                  },
                  {
                    name: "Clan :",
                    value: "`" + db.get(author_id + ".clan.name") + "`",
                    inline: true,
                  },
                  {
                    name: "Owner :",
                    value:
                      "`" +
                      message.guild.members.cache.find(
                        (m) => m.id === db.get(author_id + ".clan.owner")
                      ).user.tag +
                      "`",
                    inline: true,
                  },
                ],
                footer: {
                  text: "© Clan Wars 2021",
                  icon_url: message.guild.iconURL,
                },
              },
            });

            break;
          case "❌":
            m.delete().catch(() => {});
            message.channel.send("❌ Kick annulé.");
            break;
        }
      });
    });
  });
};
