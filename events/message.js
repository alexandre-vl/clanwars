const Discord = require("discord.js-12");
const db = require("quick.db");
const fs = require("fs");

module.exports = async (client, message, disbut) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let author_id = message.author.id;

  if (message.channel.id === "944745498361888778") {
    try {
      let file = message.attachments.first();
      if (!file) {
        message.delete();
        return message.channel
          .send("❌ Veuillez préciser une image !")
          .then((e) =>
            setTimeout(function () {
              e.delete();
            }, 5000)
          );
      }
      if (message.attachments.size > 0) {
        if (!isValidImageURL(file.url)) {
          message.delete();
          return message.channel.send("❌ Ceci n'est pas une image").then((e) =>
            setTimeout(function () {
              e.delete();
            }, 5000)
          );
        }
        if (!db.get(message.author.id + ".verfiedimgs"))
          db.set(message.author.id + ".verfiedimgs", []);
        if (db.get(message.author.id + ".verfiedimgs").includes(file.url)) {
          message.delete();
          return message.channel
            .send("❌ Vous avez déjà envoyé cette image")
            .then((e) =>
              setTimeout(function () {
                e.delete();
              }, 5000)
            );
        }
        clan = false;
        await message.guild.members.cache.forEach((m) => {
          if (!db.get(m.id + ".clan.members")) return;
          if (db.get(m.id + ".clan.members").includes(author_id)) {
            clan = db.get(m.id + ".clan");
            ownerid = m.user.id;
          }
        });
        if (clan === false)
          return "❌ Vous n'êtes dans aucun clan".then((e) =>
            setTimeout(function () {
              e.delete();
            }, 5000)
          );
        db.push(message.author.id + ".verfiedimgs", file.url);
        message.delete();
        message.channel.send("✅ Image envoyé !").then((e) =>
          setTimeout(function () {
            e.delete();
          }, 5000)
        );
        let verifmodchann = message.guild.channels.cache.find(
          (c) => c.id === "944745656860414004"
        );
        verifmodchann
          .send({
            embed: {
              author: { name: "📥 | Nouvelle verif" },
              fields: [
                {
                  name: "Membre :",
                  value: message.author.tag,
                },
                {
                  name: "Clan :",
                  value: clan.name,
                },
              ],
              image: { url: file.url },
            },
          })
          .then((m) => {
            m.react("✅");
            m.react("❌");
            db.set(m.id, message.author);
          });
      }
    } catch (e) {
      console.log(e);
    }

    function isValidImageURL(str) {
      if (typeof str !== "string") return false;
      return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
    }
  }

  let prefix = client.config.prefix;

  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) {
    if (!db.get(message.author.id + "_messagesCounter"))
      db.set(message.author.id + "_messagesCounter", 0);
    db.add(message.author.id + "_messagesCounter", 1);

    let owner;
    message.guild.members.cache.forEach((m) => {
      if (db.get(author_id + ".clan"))
        owner = db.get(author_id + ".clan.owner");
      if (!db.get(m.user.id + ".clan.members")) return;
      if (db.get(m.user.id + ".clan.members").includes(author_id)) {
        owner = db.get(m.user.id + ".clan.owner");
      }
    });
    let randomAmountOfXp = db.get(owner + ".clan.boost.enable")
      ? Math.floor(Math.random() * 9) + 1
      : Math.floor(Math.random() * 4) + 1;
    db.add(owner + ".clan.points", randomAmountOfXp);
  }
  const cmd = client.commands.get(command);
  if (!cmd) return;
  try {
    cmd.run(client, message, args, disbut);
  } catch (error) {
    message.channel.send("❌ Une erreur est survenu...");
    console.log(error);
  }
};
