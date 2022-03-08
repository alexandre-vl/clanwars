exports.run = (client, message, args) => {
  var Discord = require("discord.js");
  const db = require("quick.db");
  let author_id = message.author.id;
  let member = message.mentions.members.first();
  if (!member)
    return message.channel.send("❌ Erreur syntax : !duel `@membre`");

  if (!args[1] || !(args[1] === "separate" || args[1] === "regroup")) {
    return message.channel.send(
      "❌ Veuillez préciser :\n`separate` : Mode séparé (1 salon voc par équipe)\n`regroup` : Mode regroupé (1 salon pour tous)"
    );
  }

  if (member.user.id === author_id)
    return message.channel.send("❌ Vous ne pouvez pas vous inviter vous même");
  let owner = false;

  verif = false;
  let clan;
  message.guild.members.cache.forEach((m) => {
    if (db.get(author_id + ".clan")) verif = true;
    if (!db.get(m.user.id + ".clan.members")) return;
    if (db.get(m.user.id + ".clan.members").includes(author_id)) {
      verif = true;
      clan = db.get(m.user.id + ".clan");
      owner = db.get(m.user.id + ".clan.owner");
    }
  });

  verif2 = false;
  let clan_vs;
  message.guild.members.cache.forEach((m) => {
    if (db.get(member.user.id + ".clan")) verif2 = true;
    if (!db.get(m.user.id + ".clan.members")) return;
    if (db.get(m.user.id + ".clan.members").includes(member.user.id)) {
      clan_vs = db.get(m.user.id + ".clan");
      verif2 = true;
      owner = db.get(m.user.id + ".clan.owner");
    }
  });

  if (verif === false)
    return message.channel.send("❌ Vous n'êtes dans aucun clan");
  if (verif2 === false)
    return message.channel.send("❌ Cette personne n'a pas de clan");

  let verif3 = true;
  db.get("duals").forEach((duel) => {
    if (author_id === duel.demande || author_id === duel.adversaire) {
      verif3 = 1;
    } else if (
      member.user.id === duel.demande ||
      member.user.id === duel.adversaire
    ) {
      verif3 = 0;
    }
  });

  if (verif3 !== true)
    return message.channel.send(
      (verif3 === 1 ? "❌ Vous avez " : "❌ Cette personne a") +
        "déjà un duel en cours..."
    );
  if (
    !message.member.voice.channel ||
    message.member.voice.channel.id !== "921767834701422642"
  )
    return message.channel.send(
      "❌ Veuillez vous connecter au vocal `🛡・Attente Duels`"
    );
  if (!member.voice.channel || member.voice.channel.id !== "921767834701422642")
    return message.channel.send(
      "❌ Votre adversaire n'est pas connecté au vocal `🛡・Attente Duels`"
    );
  if (
    db.get(author_id + ".clan.members") &&
    db.get(author_id + ".clan.members").includes(member.user.id)
  )
    return message.channel.send(
      "❌ Cette personne est dans votre clan, vous ne pouvez pas la duel"
    );
  let embed = {
    embed: {
      author: { name: "💣 | Confirmation Duel" },
      description:
        "Voulez-vous vraiment duel `" +
        member.user.tag +
        "` et son clan `" +
        clan_vs.name +
        "` ?",
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
            let invitation = {
              embed: {
                author: { name: "💣 | Demande de duel" },
                description:
                  "Vous avez reçu une demande de duel de la part de `" +
                  message.author.tag +
                  "` (`" +
                  db.get(message.author.id + ".clan.name") +
                  "`).\n Voulez vous accepter le duel ?",
                footer: {
                  text: "© Clan Wars 2021",
                  icon_url: message.guild.iconURL,
                },
              },
            };

            member.send(invitation).then(async (m) => {
              try {
                await m.react("✅");
                await m.react("❌");
              } catch (e) {}

              const collector = m.createReactionCollector(
                (reaction, user) =>
                  ["✅", "❌"].includes(reaction.emoji.name) &&
                  user.id === member.id,
                { time: 120000 }
              );

              collector.on("collect", async (reaction) => {
                switch (reaction.emoji.name) {
                  case "✅":
                    member.send(
                      "<:5040discordcheck:921760140179431435> Vous venez d'accepter le demande de duel"
                    );
                    message.author.send(
                      "<:4649_VSversus:921760842867957841> La demande de duel envoyé à `" +
                        member.user.tag +
                        "` à bien été acceptée (Clan: `" +
                        clan_vs.name +
                        "`)"
                    );

                    if (args[1] === "separate") {
                      let channels = [];
                      let cat;
                      let permall = [
                        {
                          id: message.guild.roles.cache.find(
                            (r) => r.name === "@everyone"
                          ).id,
                          deny: ["VIEW_CHANNEL", "CONNECT"],
                        },
                      ];
                      let permclanvs = [
                        {
                          id: message.guild.roles.cache.find(
                            (r) => r.name === "@everyone"
                          ).id,
                          deny: ["CONNECT"],
                        },
                      ];
                      let permclan = [
                        {
                          id: message.guild.roles.cache.find(
                            (r) => r.name === "@everyone"
                          ).id,
                          deny: ["CONNECT"],
                        },
                      ];
                      clan_vs.members.forEach((m) => {
                        permall.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL"],
                        });
                        permclanvs.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL", "CONNECT"],
                        });
                      });
                      clan.members.forEach((m) => {
                        permall.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL"],
                        });
                        permclan.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL", "CONNECT"],
                        });
                      });

                      await message.guild.channels
                        .create(clan_vs.name + "⚔️" + clan.name, {
                          type: "category",
                          permissionOverwrites: permall,
                        })
                        .then((e) => (cat = e.id));
                      channels.push(cat);

                      await message.guild.channels
                        .create(clan_vs.name, {
                          type: "voice",
                          parent: cat,
                          permissionOverwrites: permclanvs,
                        })
                        .then((channel) => {
                          member.voice.setChannel(channel);
                          channels.push(channel.id);
                        });

                      await message.guild.channels
                        .create(clan.name, {
                          type: "voice",
                          parent: cat,
                          permissionOverwrites: permclan,
                        })
                        .then((channel) => {
                          message.guild.members.cache
                            .get(message.author.id)
                            .voice.setChannel(channel);
                          channels.push(channel.id);
                        });

                      await message.guild.channels
                        .create("infos", {
                          type: "text",
                          parent: cat,
                          permissionOverwrites: permall,
                        })
                        .then((channel) => {
                          channel
                            .send({
                              embed: {
                                author: "🏹 | Informations",
                                description:
                                  "Réagissez par `🟢` quand votre partie est finie\nN'oubliez pas de poster votre victoire dans le salon `〚✅〛verif-screens`",
                                footer: {
                                  text: "© Clan Wars 2021",
                                  icon_url: message.guild.iconURL,
                                },
                              },
                            })
                            .then(async (m) => {
                              await m.react("🟢");
                            });
                        });

                      if (!db.get("duals")) db.set("duals", []);
                      db.push("duals", {
                        demande: message.author.id,
                        adversaire: member.user.id,
                        channels: channels,
                      });
                    } else if (args[1] === "regroup") {
                      let channels = [];
                      let cat;
                      let perm = [
                        {
                          id: message.guild.roles.cache.find(
                            (r) => r.name === "@everyone"
                          ).id,
                          deny: ["VIEW_CHANNEL", "CONNECT"],
                        },
                      ];
                      clan_vs.members.forEach((m) => {
                        perm.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL"],
                        });
                      });
                      clan.members.forEach((m) => {
                        perm.push({
                          id: message.guild.members.cache.get(m),
                          allow: ["VIEW_CHANNEL"],
                        });
                      });

                      await message.guild.channels
                        .create(clan_vs.name + "⚔️" + clan.name, {
                          type: "category",
                          permissionOverwrites: perm,
                        })
                        .then((e) => (cat = e.id));
                      channels.push(cat);
                      await message.guild.channels
                        .create(clan_vs.name + "⚔️" + clan.name, {
                          type: "voice",
                          parent: cat,
                          permissionOverwrites: perm,
                        })
                        .then((channel) => {
                          message.guild.members.cache
                            .get(message.author.id)
                            .voice.setChannel(channel);
                          member.voice.setChannel(channel);
                          channels.push(channel.id);
                        });

                      await message.guild.channels
                        .create("infos", {
                          type: "text",
                          parent: cat,
                          permissionOverwrites: perm,
                        })
                        .then((channel) => {
                          channel
                            .send({
                              embed: {
                                author: "🏹 | Informations",
                                description:
                                  "Réagissez par `🟢` quand votre partie est finie\nN'oubliez pas de poster votre victoire dans le salon `〚✅〛verif-screens`",
                                footer: {
                                  text: "© Clan Wars 2021",
                                  icon_url: message.guild.iconURL,
                                },
                              },
                            })
                            .then(async (m) => {
                              await m.react("🟢");
                            });
                        });

                      if (!db.get("duals")) db.set("duals", []);
                      db.push("duals", {
                        demande: message.author.id,
                        adversaire: member.user.id,
                        channels: channels,
                      });
                    }
                    break;
                  case "❌":
                    member.send("❌ Vous venez de refuser la demande de duel");
                    message.author.send(
                      "❌ La demande de duel envoyé à `" +
                        member.user.tag +
                        "` à été refusée"
                    );
                    break;
                }
              });
            });
            message.channel.send(
              "<:5040discordcheck:921760140179431435> Demande de duel envoyée avec succès !"
            );

            break;
          case "❌":
            m.delete().catch(() => {});
            message.channel.send("❌ Invitation non envoyée.");
            break;
        }
      });
    });
  });
};
