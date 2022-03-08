exports.run = (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  const args1 = message.content.split(" ").slice(4).join(" ");
  let jeux = [
    "minecraft",
    "csgo",
    "rainbow-siege",
    "dota",
    "rocket-league",
    "lol",
    "overwatch",
    "dofus",
    "guildwars",
    "valorant",
    "apex",
    "fortnite",
    "hearthstone",
    "starcraft",
    "cod",
    "pubg",
    "fifa",
  ];
  let jeuxinfos = [
    {
      name: "mincraft",
      icon:
        "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
    },
    {
      name: "csgo",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9khtIQA8uLeW5UUaSa5qPQHaEo%26pid%3DApi&f=1",
    },
    { name: "rainbow-siege", icon: "none" },
    {
      name: "dota",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.J5q9-Ui2SIWI9XzDaqDd5QHaD4%26pid%3DApi&f=1",
    },
    {
      name: "rocket-league",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882301528206110761/iu.png",
    },
    {
      name: "lol",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xthptHundgxpWnG5-vnnPgHaC7%26pid%3DApi&f=1",
    },
    {
      name: "overwatch",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882301187083362345/iu.png",
    },
    {
      name: "dofus",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.WDvR8UOcdRpNV1RTBPq06wHaEK%26pid%3DApi&f=1",
    },
    {
      name: "guildwars",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.tvtropes.org%2Fpmwiki%2Fpub%2Fimages%2FGuild_Wars_2_icon_1616.jpg&f=1&nofb=1",
    },
    {
      name: "valorant",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hyhsT2zhe4LTpMRqp1i5MQHaHa%26pid%3DApi&f=1",
    },
    {
      name: "apex",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.76VVawUdHGROxgXthps9OwHaD4%26pid%3DApi&f=1",
    },
    {
      name: "fortnite",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882302983323402260/iu.png",
    },
    {
      name: "hearthstone",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.hsLcR0dtwkXYyTB-W1v6KwHaD_%26pid%3DApi&f=1",
    },
    {
      name: "starcraft",
      icon:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SKX9fi7M3WvV-lxHYuSZBwHaDZ%26pid%3DApi&f=1",
    },
    {
      name: "cod",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882303333082206228/iu.png",
    },
    {
      name: "pubg",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882303445523116082/iu.png",
    },
    {
      name: "fifa",
      icon:
        "https://cdn.discordapp.com/attachments/878319174496157727/882303551504789584/iu.png",
    },
  ];

  if (!message.member.roles.cache.some((role) => role.name === "Animateur"))
    return message.channel.send("Vous n'avez pas la permssion");
  if (!args[0])
    return message.channel.send(
      "Veuillez préciser un des jeux (minecraft, csgo, rainbow-siege, dota, rocket-league, lol, overwatch, dofus, guildwars, valorant, apex, fortnite, hearthstone, starcraft, cod, pubg, fifa)"
    );
  if (!jeux.includes(args[0]))
    return message.channel.send(
      "Jeu invalide (minecraft, csgo, rainbow-siege, dota, rocket-league, lol, overwatch, dofus, guildwars, valorant, apex, fortnite, hearthstone, starcraft, cod, pubg, fifa)"
    );

  if (!args[1])
    return message.channel.send(
      "Veuillez préciser la date de l'event (Exemple: 11/04)"
    );
  if (!args[2])
    return message.channel.send(
      "Veuillez préciser l'heure de l'event (Exemple: 9h30)"
    );
  if (!args1)
    return message.channel.send("Veuillez préciser la description de l'event");

  let channel = message.guild.channels.cache.get("882287670053732373");
  channel
    .send({
      embed: {
        title: "🎈 | Nouvel Event !",
        fields: [
          {
            name: "Hosted By:",
            value: "`" + message.author.tag + "`",
            inline: true,
          },
          { name: "Game :", value: "`" + args[1] + "`", inline: true },
          {
            name: "Date:",
            value: "`" + args[1] + " " + args[2] + "`",
            inline: true,
          },
        ],
        description: args1,
        thumbnail: { url: jeuxinfos[jeux.indexOf(args[0])].icon },
        footer: {
          text: "© Clan Wars 2021",
          icon_url: message.guild.iconURL,
        },
      },
    })
    .then(async (m) => {
      db.set("event", m);
      db.set("icon", jeuxinfos[jeux.indexOf(args[0])].icon);
      db.set("participants", []);
      await m.react("📥");
    });
};
