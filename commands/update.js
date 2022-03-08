exports.run = async (client, message) => {
  var Discord = require("discord.js-12");
  const { updaterank } = require("../handler/functions.js");
  const db = require("quick.db");

  message.guild.members.cache.forEach(async (user) => {
    const flags = await user.user.fetchFlags();

    let owner;
    message.guild.members.cache.forEach((m) => {
      if (db.get(user.id + ".clan")) owner = db.get(m.user.id + ".clan.owner");
      if (!db.get(m.user.id + ".clan.members")) return;
      if (db.get(m.user.id + ".clan.members").includes(user.id)) {
        owner = db.get(m.user.id + ".clan.owner");
      }
    });

    if (flags.toArray().includes("HOUSE_BRAVERY")) {
      if (user.roles.cache.find((r) => r.name === "HypeSquad Brilliance")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
        );
      }
      if (user.roles.cache.find((r) => r.name === "HypeSquad Balance")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Balance")
        );
      }

      let role = message.guild.roles.cache.find(
        (e) => e.name === "HypeSquad Bravery"
      );
      if (!role) {
        message.guild.roles
          .create({ data: { name: "HypeSquad Bravery", color: "b78ad4" } })
          .then((role) => {
            user.roles.add(role);
          });
      } else {
        user.roles.add(role);
        db.set(owner + ".clan.hypesquad", "HypeSquad Bravery");
      }
    } else if (flags.toArray().includes("HOUSE_BRILLIANCE")) {
      if (user.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Bravery")
        );
      }
      if (user.roles.cache.find((r) => r.name === "HypeSquad Balance")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Balance")
        );
      }

      let role = message.guild.roles.cache.find(
        (e) => e.name === "HypeSquad Brilliance"
      );
      if (!role) {
        message.guild.roles
          .create({ data: { name: "HypeSquad Brilliance", color: "ff9369" } })
          .then((role) => {
            user.roles.add(role);
          });
      } else {
        user.roles.add(role);
        db.set(owner + ".clan.hypesquad", "HypeSquad Brilliance");
      }
    } else if (flags.toArray().includes("HOUSE_BALANCE")) {
      if (user.roles.cache.find((r) => r.name === "HypeSquad Bravery")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Bravery")
        );
      }
      if (user.roles.cache.find((r) => r.name === "HypeSquad Brilliance")) {
        user.roles.remove(
          user.roles.cache.find((r) => r.name === "HypeSquad Brilliance")
        );
      }

      let role = message.guild.roles.cache.find(
        (e) => e.name === "HypeSquad Balance"
      );
      if (!role) {
        message.guild.roles
          .create({ data: { name: "HypeSquad Balance", color: "13ebad" } })
          .then((role) => {
            user.roles.add(role);
          });
      } else {
        user.roles.add(role);
        db.set(owner + ".clan.hypesquad", "HypeSquad Balance");
      }
    }
    user.roles.add(message.guild.roles.cache.get("489522756015226900"));
  });
  message.channel.send(
    "<:hypesquad:882644525753962507> Votre hypesquad à bien été mis à jour !"
  );
};
