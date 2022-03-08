exports.run = (client, message) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
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

  let fields = [];

  let clan;
  message.guild.members.cache.forEach((m) => {
    if (db.get(message.author.id + ".clan"))
      clan = db.get(message.author.id + ".clan");
    if (!db.get(m.user.id + ".clan.members")) return;
    if (db.get(m.user.id + ".clan.members").includes(message.author.id)) {
      clan = db.get(m.user.id + ".clan");
    }
  });

  ranks.forEach((rank) => {
    fields.push({
      name:
        (clan.rank.name === rank.name
          ? "<:5590serverowner:882656586265407588> ```"
          : "```") +
        rank.name +
        "```",
      value: rank.value + "xp",
      inline: true,
    });
  });

  message.channel.send({
    embed: {
      author: { name: "📌 | RankList" },
      fields: fields,
    },
  });
};
