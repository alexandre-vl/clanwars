exports.run = async (client, message) => {
  var Discord = require("discord.js");
  const db = require("quick.db");

  var word_finder = require("close-word");
  const argsall = message.content.split(" ").slice(1).join(" ");

  if (argsall) {
    let hypesquads = [
      "HypeSquad Bravery",
      "HypeSquad Brilliance",
      "HypeSquad Balance",
    ];

    var result = word_finder.findClosestOne(argsall, hypesquads);
    let role = message.guild.roles.cache.find((r) => r.name === result.word);

    let guild = await message.guild.fetch();
    let roleID = role.id;
    let memberCount = guild.roles.cache.get(roleID).members.size;

    let listname = [];
    let clans = [];
    let clanspoints = [];
    let pointstotaux = 0;

    guild.roles.cache.get(roleID).members.forEach((m) => {
      pointstotaux += db.get(m.user.id + ".clan.coins")
        ? db.get(m.user.id + ".clan.coins")
        : 0;
      listname.push(m.user.username);
      if (db.get(m.user.id + ".clan")) {
        clans.push(db.get(m.user.id + ".clan"));
        clanspoints.push(db.get(m.user.id + ".clan.points"));
      }
    });

    clanspoints.sort(function (a, b) {
      return a - b;
    });
    clanspoints.reverse();
    let classement = "";
    let e = 0;
    let emoji;
    let verif = [];
    clanspoints.forEach((point) => {
      clans.forEach((clan) => {
        if (verif.includes(clan.name)) return;
        if (point === clan.points) {
          e++;
          if (e === 1) emoji = ":first_place:";
          if (e === 2) emoji = ":second_place:";
          if (e === 3) emoji = ":third_place:";
          classement =
            classement +
            emoji +
            " #" +
            e +
            " `" +
            clan.name +
            "` - `" +
            clan.rank.name +
            "`\n";
          verif.push(clan.name);
        }
      });
    });

    if (classement === "") classement = "Aucun clan";
    let hypesquad = "";
    switch (role.name) {
      case "HypeSquad Balance":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647921407983626/9792_hypesquad_balance.png";
        break;
      case "HypeSquad Brilliance":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647924406906920/4685_hypesquad_briliance.png";
        break;
      case "HypeSquad Bravery":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647923081510974/7725_hypesquad_bravery.png";
        break;
    }
    message.channel.send({
      embed: {
        title: "🔎 | Recherche Infos HypeSquad",
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
        color: role.color,
        fields: [
          {
            name: "HypeSquad :",
            value: "`" + role.name.replace("HypeSquad ", "") + "`",
          },
          {
            name: "Coins Totaux:",
            value: "`" + pointstotaux + "` <:1824_coin:882638703728668752>",
          },
          {
            name: "Membres :",
            value: listname.join(", ") + " (" + memberCount + ")",
          },
          {
            name: "🏆 TOP 3",
            value: classement,
          },
        ],

        thumbnail: {
          url: hypesquad,
        },
        footer: {
          text: "© Clan Wars 2021",
          icon_url: message.guild.iconURL,
        },
      },
    });
  } else {
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

    let guild = await message.guild.fetch();
    let roleID = role.id;
    let memberCount = guild.roles.cache.get(roleID).members.size;

    let listname = [];
    let clans = [];
    let clanspoints = [];
    let pointstotaux = 0;
    guild.roles.cache.get(roleID).members.forEach((m) => {
      pointstotaux += db.get(m.user.id + ".clan.coins")
        ? db.get(m.user.id + ".clan.coins")
        : 0;
      listname.push(m.user.username);
      if (db.get(m.user.id + ".clan")) {
        clans.push(db.get(m.user.id + ".clan"));
        clanspoints.push(db.get(m.user.id + ".clan.points"));
      }
    });

    clanspoints.sort(function (a, b) {
      return a - b;
    });
    clanspoints.reverse();
    let classement = "";
    let e = 0;
    let emoji;
    let verif = [];
    clanspoints.forEach((point) => {
      clans.forEach((clan) => {
        if (verif.includes(clan.name)) return;
        if (point === clan.points) {
          e++;
          if (e === 1) emoji = ":first_place:";
          if (e === 2) emoji = ":second_place:";
          if (e === 3) emoji = ":third_place:";
          classement =
            classement +
            emoji +
            " #" +
            e +
            " `" +
            clan.name +
            "` - `" +
            clan.rank.name +
            "`\n";
          verif.push(clan.name);
        }
      });
    });
    if (classement === "") classement = "Aucun clan";
    let hypesquad = "";
    switch (role.name) {
      case "HypeSquad Balance":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647921407983626/9792_hypesquad_balance.png";
        break;
      case "HypeSquad Brilliance":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647924406906920/4685_hypesquad_briliance.png";
        break;
      case "HypeSquad Bravery":
        hypesquad =
          "https://cdn.discordapp.com/attachments/878385917407166464/882647923081510974/7725_hypesquad_bravery.png";
        break;
    }
    message.channel.send({
      embed: {
        title: "Infos HypeSquad",
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
        color: role.color,
        fields: [
          {
            name: "HypeSquad :",
            value: "`" + role.name.replace("HypeSquad ", "") + "`",
          },
          {
            name: "Coins Totaux:",
            value: "`" + pointstotaux + "` <:1824_coin:882638703728668752>",
          },
          {
            name: "Membres :",
            value: listname.join(", ") + " (" + memberCount + ")",
          },
          {
            name: "🏆 TOP 3",
            value: classement,
          },
        ],

        thumbnail: {
          url: hypesquad,
        },
        footer: {
          text: "© Clan Wars 2021",
          icon_url: message.guild.iconURL,
        },
      },
    });
  }
};
