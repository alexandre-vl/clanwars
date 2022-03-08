exports.run = async (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  var word_finder = require("close-word");
  const argsall = message.content.split(" ").slice(1).join(" ");
  const { updaterank } = require("../handler/functions.js");
  let ranks = [
    {
      name: "Bois",
      value: 0,
      color: "a85420",
      icon:
        "https://cdn.discordapp.com/attachments/685384232293498947/880006340590833694/rank-bois.png",
    },
    {
      name: "Bronze I",
      value: 50,
      color: "a85420",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/0/0c/Icon_Rank_21.png?width=960",
    },
    {
      name: "Bronze II",
      value: 100,
      color: "cd7f32",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/4/4a/Icon_Rank_22.png?width=960",
    },
    {
      name: "Bronze III",
      value: 200,
      color: "cd7f32",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/e/ef/Icon_Rank_23.png?width=960",
    },
    {
      name: "Bronze IV",
      value: 350,
      color: "a85420",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/7/7f/Icon_Rank_24.png?width=960",
    },
    {
      name: "Bronze V",
      value: 550,
      color: "cd7f32",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/b/b5/Icon_Rank_25.png?width=960",
    },
    {
      name: "Argent I",
      value: 800,
      color: "B4BEBE",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/5/5e/Icon_Rank_20.png?width=960",
    },
    {
      name: "Argent II",
      value: 1200,
      color: "B4BEBE",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/c/cf/Icon_Rank_17.png?width=960",
    },
    {
      name: "Argent III",
      value: 1550,
      color: "B4BEBE",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/1/19/Icon_Rank_18.png?width=960",
    },
    {
      name: "Argent IV",
      value: 1950,
      color: "B4BEBE",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/4/46/Icon_Rank_19.png?width=960",
    },
    {
      name: "Argent V",
      value: 2400,
      color: "B4BEBE",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/5/5e/Icon_Rank_20.png?width=960",
    },
    {
      name: "Or I",
      value: 2900,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/a/ae/Icon_Rank_11.png?width=960",
    },
    {
      name: "Or II",
      value: 3450,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/b/b6/Icon_Rank_12.png?width=960",
    },
    {
      name: "Or III",
      value: 4050,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/8/8b/Icon_Rank_13.png?width=960",
    },
    {
      name: "Or IV",
      value: 4700,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/b/b5/Icon_Rank_14.png?width=960",
    },
    {
      name: "Or V",
      value: 5400,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/7/7e/Icon_Rank_15.png?width=960",
    },
    {
      name: "Platinium I",
      value: 6150,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/4/48/Icon_Rank_6.png?width=960",
    },
    {
      name: "Platinium II",
      value: 6950,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/b/b4/Icon_Rank_7.png?width=960",
    },
    {
      name: "Platinium III",
      value: 7800,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/d/d6/Icon_Rank_8.png?width=960",
    },
    {
      name: "Platinium IV",
      value: 8700,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/8/87/Icon_Rank_9.png?width=960",
    },
    {
      name: "Platinium V",
      value: 9650,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/a/a8/Icon_Rank_10.png?width=960",
    },
    {
      name: "Diamond I",
      value: 10650,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/4/42/Icon_Rank_3.png?width=960",
    },
    {
      name: "Diamond II",
      value: 11700,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/d/d7/Icon_Rank_4.png?width=960",
    },
    {
      name: "Diamond III",
      value: 12800,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/1/1b/Icon_Rank_5.png?width=960",
    },
    {
      name: "Diamond IV",
      value: 13950,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/a/a1/Icon_rank_diamond1.png?width=960",
    },
    {
      name: "Diamond V",
      value: 15150,
      color: "FFD269",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/2/2e/Icon_rank_diamond.png?width=960",
    },
    {
      name: "Commando",
      value: 16400,
      color: "a85420",
      icon:
        " https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/9/93/Icon_rank_master.png?width=325",
    },
    {
      name: "Légende",
      value: 17700,
      color: "a85420",
      icon:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/paladins-realm-royale/0/0d/Icon_Rank_1.png?width=325",
    },
  ];
  if (argsall) {
    let clans = [];
    let clan;
    message.guild.members.cache.forEach((m) => {
      if (!db.get(m.user.id + ".clan")) return;
      clans.push(db.get(m.user.id + ".clan.name"));
    });
    var result = word_finder.findClosestOne(argsall, clans);
    message.guild.members.cache.forEach((m) => {
      if (!db.get(m.user.id + ".clan")) return;
      if (db.get(m.user.id + ".clan.name") === result.word) {
        if (!db.get(m.user.id + ".clan.rank"))
          return db.set(m.user.id + ".clan.rank", {
            name: "Bois",
            value: 0,
            color: "a85420",
            icon:
              "https://cdn.discordapp.com/attachments/685384232293498947/880006340590833694/rank-bois.png",
          });
        clan = db.get(m.user.id + ".clan");
      }
    });
    let owner = message.guild.members.cache.find((m) => m.id === clan.owner);
    let role;

    if (owner.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
      role = owner.roles.cache.find((r) => r.name === "HypeSquad Bravery");
    } else if (
      owner.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
    ) {
      role = owner.roles.cache.find((r) => r.name === "HypeSquad Brilliance");
    } else if (owner.roles.cache.find((r) => r.name === "HypeSquad Balance")) {
      role = owner.roles.cache.find((r) => r.name === "HypeSquad Balance");
    }
    let listname = [];
    for (i = 0; i < clan.members.length; i++) {
      listname.push(
        message.guild.members.cache.find((u) => u.id === clan.members[i]).user
          .username
      );
    }
    await updaterank(message, clan);
    const embed = new Discord.MessageEmbed()
      .setTitle("🔎 | Recherche Infos clan")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor(clan.rank.color)
      .addField(
        "<:7857blurplehastag:882654911425286244> Nom :",
        "`" + clan.name + "`"
      )
      .addField(
        "<:7649modshield:882655647584387083> Rank :",
        "`" + clan.rank.name + "`"
      )
      .addField(
        "<:hypesquad:882644525753962507> HypeSquad :",
        "`" + clan.hypesquad.replace("HypeSquad ", "") + "`"
      )
      .addField(
        "<:8263blurplemembers:882656700992217108> Membres :",
        "`" +
          clan.members.length +
          "/" +
          (clan.slots ? clan.slots : 5) +
          "` (" +
          listname.join(", ") +
          ")"
      )
      .addField(
        "<:5590serverowner:882656586265407588> Créateur :",
        "`" + owner.user.tag + "`"
      )
      .addField(
        "<:1824_coin:882638703728668752> Coins :",
        "`" + (clan.coins ? clan.coins : 0) + " coins`"
      )

      .setThumbnail(
        clan.rank.icon
          ? clan.rank.icon
          : "https://cdn.discordapp.com/attachments/878385917407166464/879039712789147648/zK6SJWHa_400x400.jpg"
      )
      .setFooter("© Clan Wars 2021", message.guild.iconURL);
    message.channel.send(embed);
  } else {
    let verif = false;
    let clan;
    message.guild.members.cache.forEach((m) => {
      if (!db.get(m.user.id + ".clan.members")) return;
      if (db.get(m.user.id + ".clan.members").includes(author_id)) {
        clan = db.get(m.user.id + ".clan");
        if (!db.get(m.user.id + ".clan.rank"))
          return db.set(m.user.id + ".clan.rank", {
            name: "Bois",
            value: 0,
            color: "a85420",
            icon:
              "https://cdn.discordapp.com/attachments/685384232293498947/880006340590833694/rank-bois.png",
          });
        verif = true;
      }
    });

    if ((verif = false && !db.get(author_id + ".clan")))
      return message.channel.send(
        "❌ Erreur : Vous n'avez pas de clan. Pour en créer un tapez `!create <nom>`"
      );

    if ((verif = false)) clan = db.get(author_id + ".clan");
    if (!clan)
      return message.channel.send(
        "❌ Erreur : Vous n'avez pas de clan. Pour en créer un tapez `!create <nom>`"
      );
    if (!clan.rank)
      return db.set(author + ".clan.rank", { name: "Bois", color: "a85420" });
    let listname = [];
    for (i = 0; i < clan.members.length; i++) {
      listname.push(
        message.guild.members.cache.find((u) => u.id === clan.members[i]).user
          .username
      );
    }

    let role;
    if (
      message.member.roles.cache.find((r) => r.name === "HypeSquad Bravery")
    ) {
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

    let owner = message.guild.members.cache.find((m) => m.id === clan.owner);

    let rank;
    ranks.forEach((r) => {
      if (r.name === clan.rank.name) rank = ranks[ranks.indexOf(r) + 1];
    });
    await updaterank(message, clan);

    let pourcent = Math.floor((clan.points / rank.value) * 100);
    let value = Math.floor(5 * (pourcent / 100));
    let string = "";
    for (i = 0; i < value + 1; i++) {
      if (i === 1) string += "<:905887735565398108:922223765469929483>";
      if (i === 2) string += "<:905887735691218954:922223990347534406>";
      if (i === 3) string += "<:905887735691218954:922223990347534406>";
      if (i === 4) string += "<:905887735691218954:922223990347534406>";
      if (i === 5) string += "<:9058877357625344911:922215695629041755>";
    }
    if (value === 0)
      string +=
        "<:905887735422808105:922227022284079165><:905887735733174332:922226557936873482><:905887735733174332:922226557936873482><:905887735733174332:922226557936873482><:905887735666065489:922223703520075876>";
    if (value === 1)
      string +=
        "<:905887735733174332:922226557936873482><:905887735733174332:922226557936873482><:905887735733174332:922226557936873482><:905887735666065489:922223703520075876>";
    if (value === 2)
      string +=
        "<:905887735733174332:922226557936873482><:905887735733174332:922226557936873482><:905887735666065489:922223703520075876>";
    if (value === 3)
      string +=
        "<:905887735733174332:922226557936873482><:905887735666065489:922223703520075876>";
    if (value === 4) string += "<:905887735666065489:922223703520075876>";

    const embed = new Discord.MessageEmbed()
      .setTitle("Infos clan")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      )
      .setColor(clan.rank.color)
      .addField(
        "<:7857blurplehastag:882654911425286244> Nom :",
        "`" + clan.name + "`"
      )
      .addField(
        "<:7649modshield:882655647584387083> Rank :",
        string +
          " " +
          clan.points +
          "/" +
          rank.value +
          "xp (`" +
          clan.rank.name +
          "`)"
      )
      .addField(
        "<:hypesquad:882644525753962507> HypeSquad :",
        "`" + role.name.replace("HypeSquad ", "") + "`"
      )
      .addField(
        "<:8263blurplemembers:882656700992217108> Membres :",
        "`" +
          clan.members.length +
          "/" +
          (clan.slots ? clan.slots : 5) +
          "` (" +
          listname.join(", ") +
          ")"
      )
      .addField(
        "<:5590serverowner:882656586265407588> Créateur :",
        "`" + owner.user.tag + "`"
      )
      .addField(
        "<:1824_coin:882638703728668752> Coins :",
        "`" + (clan.coins ? clan.coins : 0) + " coins`"
      )
      .setThumbnail(
        clan.rank.icon
          ? clan.rank.icon
          : "https://cdn.discordapp.com/attachments/878385917407166464/879039712789147648/zK6SJWHa_400x400.jpg"
      )
      .setFooter("© Clan Wars 2021", message.guild.iconURL);
    message.channel.send(embed);
  }
};
