import fs from "fs";
export default {
  name: "warn",
  description: "Warn a user",
  async execute(msg, args) {
    const dataPath = "data/moderation.json";
    const db = JSON.parse(fs.readFileSync(dataPath));
    const member = msg.mentions.members.first();
    if (!msg.member.permissions.has("ManageMessages")) return msg.reply("No permission.");
    if (!member) return msg.reply("Mention someone.");

    const reason = args.slice(1).join(" ") || "No reason";
    const gid = msg.guild.id;
    const uid = member.id;

    if (!db.guilds[gid]) db.guilds[gid] = {warnings:{}};
    if (!db.guilds[gid].warnings[uid]) db.guilds[gid].warnings[uid] = [];

    db.guilds[gid].warnings[uid].push({
      reason,
      moderator: msg.author.id,
      date: Date.now()
    });

    fs.writeFileSync(dataPath, JSON.stringify(db,null,2));
    msg.reply(`⚠️ Warned **${member.user.tag}** | ${reason}`);
  }
}