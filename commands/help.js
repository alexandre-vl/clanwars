exports.run = (client, message) => {
  var Discord = require("discord.js-12");

  let cmdclan = [
    "`!clan [nom]` Donne des informations sur votre clan",
    "`!clans` Donne des informations sur tous les clans",
    "`!create <nom>` Permet de créer un clan",
    "`!invite <@membre>` Permet d'inviter quelqu'un dans votre clan",
    "`!disband` Permet de supprimer son clan",
    "`!leave` Permet de quitter son clan",
    "`!rename <nom>` Permet de rename son clan",
    "`!lock` Permet de lock son vocal privé",
    "`!unlock` Permet de unlock son vocal privé",
    "`!stats` Permet de voir ses stats",
    "`!eco <add/remove/reset> <@membre> <somme>` Permet de gérer l'économie d'un clan",
    "`!shop` Permet de consulter le shop",
    "`!buy <nombre>` Permet d'acheter un articles du shop",
    "`!ranklist` Permet de voir la liste des ranks",
  ];
  let cmdhypesquad = [
    "`!update` Permet de mettre à jour sa HypeSquad",
    "`!hypesquad [hypesquad]` Donne des informations sur votre hypesquad",
  ];

  let utils = [
    "`!report <@membre> <raison>` Permet de report quelqu'un",
    "`!tournois <jeu> <date> <heure> <description>` Permet de créer un event",
    "`!clear <nombre>` Permet de clear un nombre de messages",
  ];

  const help = new Discord.MessageEmbed()
    .setTitle("Les commandes")
    .setAuthor(
      message.author.tag,
      message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })
    )
    .setColor("ed1111")
    .addField("⚔ Clan", cmdclan.join("\n"))
    .addField("🔰 HypeSquad", cmdhypesquad.join("\n"))
    .addField("🎈 Utiles", utils.join("\n"))
    .setFooter("© Clan Wars 2021", message.guild.iconURL);
  message.channel.send(help);
};
