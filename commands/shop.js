exports.run = async (client, message, args) => {
  const { MessageEmbed } = require("discord.js-12");
  const DiscordPages = require("discord-pages");

  const embed1 = new MessageEmbed()
    .setAuthor("💸 Shop 💸")
    .setDescription(
      "Achète les articles que tu veux en faisant `!buy <nombre>`"
    )
    .setColor("ed1111")
    .addField(
      "[`0`] <:8263blurplemembers:882656700992217108> Upgrade Slots",
      "`80` <:1824_coin:882638703728668752>"
    )
    .addField("[`1`] 🔮 Boost Xp (1h)", "`120` <:1824_coin:882638703728668752>")
    .addField(
      "[`2`] ⏳ Réducteur Temps Screen",
      "`100` <:1824_coin:882638703728668752>"
    );

  const embed2 = new MessageEmbed()
    .setAuthor("💸 Shop 💸")
    .setDescription(
      "Achète les articles que tu veux en faisant `!buy <nombre>`"
    )
    .setColor("ed1111");

  const pages = [embed1, embed2];

  const embedPages = new DiscordPages({
    pages: pages,
    channel: message.channel,
  });
  embedPages.createPages();
};
