exports.run = async (client, message) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  const { updaterank } = require("../handler/functions.js");

  el_per_page = 5;

  clans = [];
  items = [];
  clanspoints = [];
  message.guild.members.cache.forEach((m) => {
    if (!db.get(m.user.id + ".clan")) return;
    clans.push(db.get(m.user.id + ".clan"));
    clanspoints.push(db.get(m.user.id + ".clan.points"));
  });

  clanspoints.sort(function (a, b) {
    return a - b;
  });
  clanspoints.reverse();

  let verif = [];

  clanspoints.forEach((p) => {
    clans.forEach((c) => {
      // if(!cl) return
      if (verif.includes(c.name)) return;
      if (p === c.points) {
        items.push(c);
        verif.push(c.name);
      }
    });
  });

  let page_count = Math.ceil(items.length / el_per_page);
  async function createshopembed(page_number) {
    fields = [];

    let first_element = 0;
    if (page_number > 0) first_element = el_per_page * page_number;
    let last_element = el_per_page * (page_number + 1) - 1;

    for (let i = last_element; i > first_element - 1; i = i - 1) {
      if (items[i]) {
        await updaterank(message, items[i]);
        let hypesquad = "";
        switch (items[i].hypesquad) {
          case "HypeSquad Balance":
            hypesquad = "<:HypesquadBalance:882637455109545984>";
            break;
          case "HypeSquad Brilliance":
            hypesquad = "<:HypesquadBrillance:882637456577536030>";
            break;
          case "HypeSquad Bravery":
            hypesquad = "<:HypesquadBravery:882637456174903356>";
            break;
        }
        fields.unshift({
          name: " #" + parseInt(i + 1) + " | `" + items[i].name + "`",
          value:
            "<:7649modshield:882655647584387083> Rank : `" +
            items[i].rank.name +
            "`\n<:1618_users_logo:882641753520365679> Membres : `" +
            items[i].members.length +
            "/" +
            (items[i].slots ? items[i].slots : 5) +
            "`\n<:hypesquad:882644525753962507> HypeSquad : " +
            hypesquad +
            "\n<:1824_coin:882638703728668752> Coins : `" +
            (items[i].coins ? items[i].coins : 0) +
            "`",
          inline: false,
        });
      }
    }
  }

  let currentIndex = 0;
  if (page_count > 1) {
    currentIndex = 0;
    await createshopembed(currentIndex);
    message.channel
      .send({
        embed: {
          color: "ed1111",
          author: {
            name: "Classement Clans",
          },
          fields: fields,
          footer: {
            text:
              currentIndex + 1 + "/" + page_count + " pages • © Clan Wars 2021",
          },
        },
      })
      .then(async (message) => {
        await message.react("⬅️");
        await message.react("➡️");
        const collector = message.createReactionCollector(
          (reaction, user) =>
            ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === author_id,
          { time: 60000 }
        );

        collector.on("collect", async (reaction) => {
          reaction.users.remove(author_id);

          await message.react("⬅️");
          await message.react("➡️");
          if (reaction.emoji.name === "⬅️") {
            currentIndex = currentIndex - 1;
            if (currentIndex < 0) return (currentIndex = 0);
          }
          if (reaction.emoji.name === "➡️") {
            currentIndex++;
            if (currentIndex > page_count - 1)
              return (currentIndex = currentIndex - 1);
          }
          await createshopembed(currentIndex);
          message.edit({
            embed: {
              color: "ed1111",
              author: {
                name: "Classement Clans",
              },
              fields: fields,
              footer: {
                text:
                  currentIndex +
                  1 +
                  "/" +
                  page_count +
                  " pages • © Clan Wars 2021",
              },
            },
          });
        });
      });
  } else {
    await createshopembed(0);
    message.channel.send({
      embed: {
        color: "ed1111",
        author: {
          name: "Classement Clans",
        },
        fields: fields,
        footer: {
          text:
            currentIndex + 1 + "/" + page_count + " pages • © Clan Wars 2021",
        },
      },
    });
  }
};
