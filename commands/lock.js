exports.run = (client, message) => {
  var Discord = require("discord.js-12");

  if (
    !message.member.voice.channel ||
    !message.member.voice.channel.name.endsWith(
      message.member.user.username + "'s channel"
    )
  )
    return message.channel.send("❌ Vous n'avez aucun channel vocal perso...");
  if (message.member.voice.channel.name.startsWith("🔓")) {
    message.member.voice.channel.overwritePermissions([
      {
        id: message.guild.roles.cache.find((r) => r.name === "@everyone").id,
        deny: ["CONNECT"],
      },
    ]);
    message.member.voice.channel.setName(
      "🔒 " + message.author.username + "'s channel"
    );
    message.channel.send(
      "<:5040discordcheck:921760140179431435> Vous venez de lock le channel"
    );
  } else if (message.member.voice.channel.name.startsWith("🔒")) {
    message.channel.send("❌ Le channel est déjà lock");
  }
};
