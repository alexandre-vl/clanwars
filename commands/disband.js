exports.run = (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;

  // let clan = false
  // message.guild.members.cache.forEach(m=>{
  //     if(find !== false) return
  //     if(db.get(author_id+".clan.members").includes(author_id)) return clan = db.get(author_id+".clan.members")
  // })
  if (!db.get(author_id + ".clan"))
    return message.channel.send("❌ Vous n'avez pas de clan");

  const embed = new Discord.MessageEmbed()
    .setAuthor("📛 | Suppréssion Clan")
    .setDescription("Voulez-vous vraiment supprimer votre clan ?")
    .setFooter("© Clan Wars 2021", message.guild.iconURL);
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
            db.delete(message.author.id + ".clan");
            message.channel.send("📛 Votre clan à bien été supprimé.");
            break;
          case "❌":
            m.delete().catch(() => {});
            message.channel.send("❌ Action annulée.");
            break;
        }
      });
    });
  });
};
