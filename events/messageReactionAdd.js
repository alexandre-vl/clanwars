module.exports = async (client, reaction, user) => {
  const Discord = require("discord.js-12");
  const db = require("quick.db");
  const { updaterank } = require("../handler/functions.js");
  if (!reaction.message.guild) return;
  let guild = client.guilds.cache.get("489504947692503040");
  let chann = reaction.message.channel;
  let userID = user.id;
  //let role = guild.roles.cache.get("role_id") //role id is defined by yourself
  if (userID === "878387942219988992") return;
  if (chann.id === "944745656860414004") {
    let messageID = reaction.message.id;

    let message = await chann.messages.fetch(messageID);
    if (reaction.emoji.name === "✅") {
      let member = guild.members.cache.get(db.get(messageID).id);
      let ownerid;
      clan = false;
      await message.guild.members.cache.forEach((m) => {
        if (!db.get(m.id + ".clan.members")) return;
        if (db.get(m.id + ".clan.members").includes(userID)) {
          clan = db.get(m.id + ".clan");
          ownerid = m.user.id;
        }
      });
      if (clan === false)
        return "❌ Une erreur s'est produite. Vous avez quitté votre clan".then(
          (e) =>
            setTimeout(function () {
              e.delete();
            }, 5000)
        );

      db.add(ownerid + ".clan.coins", 10);
      let logspointschann = guild.channels.cache.find(
        (c) => c.id === "944745544671178812"
      );
      member.send(
        "✅ Votre image à été accepté, votre clan gagne `10 coins` !"
      );
      await updaterank(message, db.get(ownerid + ".clan"));
      logspointschann.send(
        "🏆 L'image de `" +
          member.user.tag +
          "` à été accepté, son clan `" +
          db.get(ownerid + ".clan.name") +
          "` gagne `10 coins`"
      );
    }
  }

  if (chann.id === "944682589212524554") {
    if (reaction.emoji.name === "📥") {
      if (!db.get(user.id + ".clan.name")) {
        return chann.send("Vous n'avez pas de clan").then((m) => {
          setTimeout(function () {
            if (m) m.delete();
          }, 3000);
        });
      }
      if (db.get("participants").includes(db.get(user.id + ".clan.name"))) {
        return chann.send("Vous vous êtes déjà inscris").then((m) => {
          setTimeout(function () {
            if (m) m.delete();
          }, 3000);
        });
      }

      let message = db.get("event");
      let embed = await message.embeds;
      let participants = "";

      let field = embed[0].fields.find((e) => e.name === "Participants :");
      if (field) {
        participants = participants + field.value + ", ";
        embed[0].fields.pop();
      } else participants = "";

      let virgule = ", ";
      if (participants.endsWith(", ")) virgule = "";
      if (participants === "") virgule = "";

      embed[0].fields.push({
        name: "Participants :",
        value: participants + db.get(user.id + ".clan.name") + virgule,
      });
      db.push("participants", db.get(user.id + ".clan.name"));
      let embedend = Object.assign(
        { thumbnail: { url: db.get("icon") } },
        embed[0]
      );
      let mess = await chann.messages.fetch(message.id);
      await mess.edit({ embed: embedend }).then((m) => {
        db.set("event", m);
      });
    }
  }

  if (chann.name === "infos") {
    if (reaction.emoji.name === "🟢") {
      let channels;
      let demande;
      let adversaire;
      let duals = db.get("duals");
      let index;
      duals.forEach((duel) => {
        if (userID === duel.demande || userID === duel.adversaire) {
          channels = duel.channels;
          demande = guild.members.cache.get(duel.demande);
          adversaire = guild.members.cache.get(duel.adversaire);
          index = duals.indexOf(duel);
        }
      });
      await demande.voice.setChannel("921767834701422642");
      await adversaire.voice.setChannel("921767834701422642");
      try {
        channels.forEach((channel) => {
          guild.channels.cache.get(channel).delete();
        });
        chann.delete();
      } catch (e) {
        console.log(e);
      }

      duals.splice(index);
      db.set("duals", duals);
    }
  }
};
