exports.run = async (client, message, args) => {
  var Discord = require("discord.js-12");
  let author_id = message.author.id;
  let member = message.mentions.members.first();

  const argsall = message.content.split(" ").slice(2).join(" ");
  if (!member || !argsall)
    return message.channel.send(
      "❌ Erreur syntax : !report `<@membre>` `<raison>`"
    );
  if (member.user.id === author_id)
    return message.channel.send("❌ Vous ne pouvez pas vous report vous même");
  if (argsall.length > 100)
    return message.channel.send("❌ Veuillez préciser une raison moins longue");

  let modchannel = message.guild.channels.cache.find(
    (c) => c.id === "846695473326456843"
  );
  modchannel.send({
    embed: {
      author: { name: "🔱 | Report" },
      fields: [
        {
          name: "Membre :",
          value: "`" + message.author.tag + "`",
          inline: true,
        },
        {
          name: "Membre Report :",
          value: "`" + member.user.tag + "`",
          inline: true,
        },
        { name: "Raison :", value: "`" + argsall + "`", inline: true },
      ],
      footer: { text: "© Clan Wars 2021", icon_url: message.guild.iconURL },
    },
  });

  message.channel.send(
    "<:5236_warning_1:921761590846554152> Report bien envoyé, un membre du staff prendra en charge votre report"
  );
};
