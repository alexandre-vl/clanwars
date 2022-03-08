module.exports = (client, member) => {
  const Discord = require("discord.js-12");
  const db = require("quick.db");

  let joinchannel = member.guild.channels.cache.find(
    (c) => c.id == "CHANNEL ID"
  );

  let joinembed = new Discord.MessageEmbed()
    .setColor("random")
    .setAuthor("😪 | Au revoir... ")
    .setDescription(
      "Au revoir <@" +
        member +
        "> qui nous quitte... !\nNous sommes désormais `" +
        member.guild.memberCount +
        "` membres."
    )
    .setThumbnail(member.user.avatarURL({ size: 256 }))
    .setTimestamp()
    .setFooter(member.guild.name);

  if (joinchannel) joinchannel.send(joinembed);
  else return;
};
