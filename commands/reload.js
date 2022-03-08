exports.run = (client, message, args) => {
  if (!["614052096857341952", "594631985922703403"].includes(message.author.id))
    return;

  if (!args || args.length < 1) return message.reply("Précise la commande");
  const commandName = args[0];

  if (!client.commands.has(commandName)) {
    return message.reply("Commande inconnue");
  }
  delete require.cache[require.resolve(`./${commandName}.js`)];

  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(
    `<:5040discordcheck:921760140179431435> La commande \`${commandName}\` a été reload`
  );
};
