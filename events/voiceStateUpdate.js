const message = require("./message");
const db = require("quick.db");

module.exports = async (oldMember, newMember) => {
  let catID = "489523011700129823";
  let member = await newMember.guild.members.cache.get(newMember.id);

  let createchann = newMember.guild.channels.cache.get("944748000713007135");
  let newUserChannel = await newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  if (!member.voice.channel) {
    if (oldUserChannel.name.endsWith("'s channel")) {
      if (oldUserChannel.members.size < 1) {
        oldUserChannel.delete();
      }
    }
    return;
  }

  if (member.voice.channel.id === "944748000713007135") {
    let name = `🔓 ${member.user.username}'s channel`;
    newState.guild.channels
      .create(name, {
        type: "voice",
      })
      .then((createChan) => {
        createChan.setParent(catID);
        member.voice.setChannel(createChan);
      });
    return;
  }

  if (member.voice.channel) {
    let i = 0;
    let timer = setInterval(async () => {
      i++;
      let owner;
      newMember.guild.members.cache.forEach((m) => {
        if (owner) return;
        if (db.get(member.user.id + ".clan")) {
          owner = db.get(member.user.id + ".clan.owner");
        }
        if (!db.get(m.user.id + ".clan.members")) return;
        if (db.get(m.user.id + ".clan.members").includes(member.user.id)) {
          owner = db.get(m.user.id + ".clan.owner");
        }
      });

      if (!owner) return;
      if (i === 3600) {
        let owner;
        newMember.guild.members.cache.forEach((m) => {
          if (db.get(member.id + ".clan"))
            owner = db.get(member.id + ".clan.owner");
          if (!db.get(m.user.id + ".clan.members")) return;
          if (db.get(m.user.id + ".clan.members").includes(member.id)) {
            owner = db.get(m.user.id + ".clan.owner");
          }
        });
        let randomAmountOfXp = db.get(owner + ".clan.boost.enable")
          ? Math.floor(Math.random() * 99) + 1
          : Math.floor(Math.random() * 49) + 1;
        db.add(owner + ".clan.points", randomAmountOfXp);
        i = 0;
      }

      if (!db.get(member.user.id + "_voicetimer"))
        db.set(member.user.id + "_voicetimer", 0);
      db.add(member.user.id + "_voicetimer", 1);
      if (!member.voice.channel) {
        clearInterval(timer);
        i = 0;
      }
    }, 1000);
  }
};
