exports.run = (client, message, args) => {
  const args1 = message.content.split(" ").slice(1).join(" ");
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "❌ Je n'ai pas la permission de faire cette commande"
    );

  if (!Number.isInteger(parseInt(args1 + args1)))
    return message.channel.send("❌ Veuillez préciser un nombre correct");
  let clearnbr = parseInt(args1);
  if (clearnbr - 1 < 1)
    return message.channel.send("❌ Veuillez préciser un nombre supérieur à 0");

  if (clearnbr - 1 > 100)
    return message.channel.send(
      "❌ Veuillez préciser un nombre inférieur à 100"
    );

  message.channel.messages.fetch({ limit: clearnbr + 1 }).then((messages) => {
    message.channel.bulkDelete(messages);
    message.channel
      .send(
        "<:5040discordcheck:921760140179431435> `" +
          clearnbr +
          "` messages supprimés."
      )
      .then((m) => {
        setTimeout(function () {
          if (m) m.delete();
        }, 3000);
      });
  });
};
