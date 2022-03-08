module.exports = async (client, member) => {
  const Discord = require("discord.js-12");
  const db = require("quick.db");

  let role = member.guild.roles.cache.find(
    (r) => r.id === "489522756015226900"
  );
  const flags = await member.user.fetchFlags();

  if (flags.toArray().includes("HOUSE_BRAVERY")) {
    let role = member.guild.roles.cache.find(
      (e) => e.name === "HypeSquad Bravery"
    );
    if (!role) {
      member.guild.roles
        .create({ data: { name: "HypeSquad Bravery", color: "b78ad4" } })
        .then((role) => {
          member.roles.add(role);
        });
    } else {
      member.roles.add(role);
    }
  } else if (flags.toArray().includes("HOUSE_BRILLIANCE")) {
    let role = member.guild.roles.cache.find(
      (e) => e.name === "HypeSquad Brilliance"
    );
    if (!role) {
      member.guild.roles
        .create({ data: { name: "HypeSquad Brilliance", color: "ff9369" } })
        .then((role) => {
          member.roles.add(role);
        });
    } else {
      member.roles.add(role);
    }
  } else if (flags.toArray().includes("HOUSE_BALANCE")) {
    let role = member.guild.roles.cache.find(
      (e) => e.name === "HypeSquad Balance"
    );
    if (!role) {
      member.guild.roles
        .create({ data: { name: "HypeSquad Balance", color: "13ebad" } })
        .then((role) => {
          member.roles.add(role);
        });
    } else {
      member.roles.add(role);
    }
  }

  member.roles.add(role);
};
