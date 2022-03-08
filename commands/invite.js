exports.run = async (client, message, args) => {
  var Discord = require("discord.js");
  const db = require("quick.db");
  let author_id = message.author.id;
  let member = message.mentions.members.first();
  if (!member)
    return message.channel.send("❌ Erreur syntax : !invite `@membre`");
  if (member.user.id === author_id)
    return message.channel.send("❌ Vous ne pouvez pas vous inviter vous même");

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

  verif2 = false;
  message.guild.members.cache.forEach((m) => {
    if (db.get(member + ".clan")) verif2 = true;
    if (!db.get(m.user.id + ".clan")) return;
    if (db.get(m.user.id + ".clan.members").includes(member.user.id)) {
      verif2 = true;
    }
  });

  if (verif2 === true)
    return message.channel.send("❌ Cette personne est déjà dans un clan");

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

  if (!member.roles.cache.find((r) => r.name === role.name))
    return message.channel.send(
      "❌ Vous n'êtes pas dans la même hypesquad, il est donc impossible d'inviter cette perssone."
    );

  if (db.get(author_id + ".clan.members").includes(member.user.id))
    return message.channel.send(
      "❌ Cette personne fait déjà parti de votre clan"
    );
  if (db.get(author_id + ".clan.members").length > 4)
    return message.channel.send("❌ Votre clan est au complet");
  let embed = {
    embed: {
      author: { name: "📮 | Confirmation Invitation" },
      description:
        "Voulez-vous vraiment inviter `" +
        member.user.tag +
        "` dans votre clan ?",
      footer: { text: "© Clan Wars 2021", icon_url: message.guild.iconURL },
    },
  };
  await message.channel.send(embed).then((m) => {
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
            if (member.user.bot)
              return message.channel.send(
                "❌ Vous ne pouvez pas inviter un bot !"
              );
            m.delete().catch(() => {});
            let invitation = {
              embed: {
                author: { name: "📨 | Invitation" },
                description:
                  "Vous avez reçu une invitation de `" +
                  message.author.tag +
                  "` pour rejoindre son clan `" +
                  db.get(message.author.id + ".clan.name") +
                  "`.\n Voulez vous accepter l'invitation ?",
                footer: {
                  text: "© Clan Wars 2021",
                  icon_url: message.guild.iconURL,
                },
              },
            };

            member.send(invitation).then(async (m) => {
              await m.react("✅");
              await m.react("❌").then((r) => {
                const collector = m.createReactionCollector(
                  (reaction, user) =>
                    ["✅", "❌"].includes(reaction.emoji.name) &&
                    user.id === member.id,
                  { time: 120000 }
                );

                collector.on("collect", async (reaction) => {
                  switch (reaction.emoji.name) {
                    case "✅":
                      db.push(
                        message.author.id + ".clan.members",
                        member.user.id
                      );
                      try {
                        member.send(
                          "<:5040discordcheck:921760140179431435> Vous venez d'accepter l'invitation"
                        );
                        message.author.send(
                          "<:8630inviteart:921759216073576458> L'invitation envoyé à `" +
                            member.user.tag +
                            "` à bien été acceptée"
                        );
                      } catch (e) {
                        console.log("L'utilisateur bloque ses mps");
                      }

                      break;
                    case "❌":
                      try {
                        member.send("❌ Vous venez de refuser l'invitation");
                        message.author.send(
                          "❌ L'invitation envoyé à `" +
                            member.user.tag +
                            "` à été refusée"
                        );
                      } catch (e) {
                        console.log("L'utilisateur bloque ses mps");
                      }

                      break;
                  }
                });
              });
            });
            message.channel.send(
              "<:5040discordcheck:921760140179431435> Invitation envoyée avec succès !"
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

  // const help = new Discord.MessageEmbed()
  //   .setTitle('Infos clan')
  //   .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  //   .setColor('ed1111')
  //   .addField("Nom :", "`"+db.get(message.author.id+".clan.name")+"`")
  //   .addField("Membres :", "`"+db.get(message.author.id+".clan.members").length+"/3`")
  //   .addField("Points :", "`"+db.get(message.author.id+".clan.points")+" points`")
  //   .addThumbail(db.get(message.author.id+".clan.icon") ? db.get(message.author.id+".clan.icon") :"https://cdn.discordapp.com/attachments/878385917407166464/879039712789147648/zK6SJWHa_400x400.jpg" )
  //   .setFooter('© Clan Wars 2021', message.guild.iconURL);
  // message.channel.send(help);
};
