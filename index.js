const Discord = require("discord.js-12");
const Enmap = require("enmap");
const fs = require("fs");

const db = require("quick.db");

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

const InvitesTracker = require("@androz2091/discord-invites-tracker");
const tracker = InvitesTracker.init(client, {
  fetchGuilds: true,
  fetchVanity: true,
  fetchAuditLogs: true,
});

const config = require("./config.json");
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loading ${commandName}`);
    client.commands.set(commandName, props);
  });
});

////////////////////////////////
////////////INVITE TRACKER//////
////////////////////////////////

tracker.on("guildMemberAdd", async (member, type, invite) => {
  const welcomeChannel = member.guild.channels.cache.find(
    (ch) => ch.id === "879456977988751420"
  );

  if (type === "normal" || type === "vanity") {
    let inviter = member.guild.members.cache.get(invite.inviter.id);
    if (!db.get(invite.inviter.id + ".invites"))
      db.set(invite.inviter.id + ".invites", []);
    if (
      db.get(invite.inviter.id + ".invites") &&
      !db.get(invite.inviter.id + ".invites").includes(member.id)
    )
      db.push(invite.inviter.id + ".invites", member.id);
    if (db.get(invite.inviter.id + ".invites").length >= 10)
      inviter.roles.add("925110390378082365").catch((e) => {});
    welcomeChannel.send(
      `Bienvenue ${member}! Il a été invité par \`${invite.inviter.username}\`! (` +
        db.get(invite.inviter.id + ".invites").length +
        ` invites)`
    );
    let clan;
    member.guild.members.cache.forEach((m) => {
      if (db.get(member.id + ".clan")) clan = db.get(member.id + ".clan");
      if (
        db.get(m.user.id + ".clan") &&
        db.get(m.user.id + ".clan.members").includes(member.id)
      )
        db.get(m.user.id + ".clan");
    });
    console.log(clan);
    if (clan !== undefined) db.add(clan.owner + ".clan.coins", 10);
  } else if (type === "unknown") {
    welcomeChannel.send(
      `Bienvenue ${member}! Je n'arrive pas à savoir comment il a rejoint...`
    );
  }
});

client.on("guildMemberRemove", (member) => {
  member.guild.members.cache.forEach((element) => {
    let stats = db.get(element.id + "invites");
    if (!db.get(element.id + "invites")) return;
    if (db.get(element.id + "invites").includes(member.id)) {
      stats.splice(stats.indexOf(element, 1));
      db.set(element.id + "invites", stats);
    }
  });
});

client.login(config.token);
