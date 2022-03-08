module.exports = (client, disbut) => {
  const db = require("quick.db");
  console.log("Client prêt !");

  client.user.setActivity("Games");

  let guild = client.guilds.cache.get("489504947692503040");

  setInterval(() => {
    guild.members.cache.forEach((author) => {
      if (db.get(author.user.id + ".clan")) {
        if (db.get(author.user.id + ".clan.boost.enable")) {
          if (
            db.get(author.user.id + ".clan.boost.starttime") - Date.now() >=
            db.get(author.user.id + ".clan.boost.time")
          ) {
            db.set(author.user.id + ".clan.boost", {
              starttime: 0,
              enable: false,
              time: 0,
            });
          }
        }
      }
      guild.members.cache.forEach((m) => {
        if (!db.get(m.user.id + ".clan.members")) return;
        if (db.get(m.user.id + ".clan.members").includes(author.user.id)) {
          if (db.get(m.user.id + ".clan.boost.enable")) {
            if (
              db.get(m.user.id + ".clan.boost.starttime") - Date.now() >=
              db.get(m.user.id + ".clan.boost.time")
            ) {
              db.set(m.user.id + ".clan.boost", {
                starttime: 0,
                enable: false,
                time: 0,
              });
            }
          }
        }
      });
    });
  }, 60000);
};
