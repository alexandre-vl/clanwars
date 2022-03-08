exports.run = (client, message, args) => {
  var Discord = require("discord.js-12");
  const db = require("quick.db");
  let author_id = message.author.id;
  let ownerid;

  let clan = false;
  message.guild.members.cache.forEach((m) => {
    if (!db.get(m.id + ".clan.members")) return;
    if (db.get(m.id + ".clan.members").includes(author_id)) {
      clan = db.get(m.id + ".clan");
      ownerid = m.user.id;
    }
  });

  if ((clan = false)) return "❌ Vous n'êtes dans aucun clan";
  if (db.get(author_id + ".clan"))
    return message.channel.send(
      "❌ Vous ne pouvez pas leave votre clan, pour le supprimé, tapez `!disband`"
    );

  const embed = new Discord.MessageEmbed()
    .setAuthor("🛑 | Leave Clan")
    .setDescription("Voulez-vous vraiment quitter votre clan ?")
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
            let listmembers = db.get(ownerid + ".clan.members");
            const index = listmembers.indexOf(author_id);
            listmembers.splice(index, 1);

            db.set(ownerid + ".clan.members", listmembers);
            message.channel.send("📛 Vous venez de quitter votre clan.");
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
