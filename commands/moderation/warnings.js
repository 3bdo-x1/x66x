import fs from "fs";
export default {
  name: "warnings",
  description: "View warnings",
  async execute(msg) {
    const dataPath = "data/moderation.json";
    const db = JSON.parse(fs.readFileSync(dataPath));
    const member = msg.mentions.members.first();
    if (!member) return msg.reply("Mention someone.");

    const gid = msg.guild.id;
    const uid = member.id;

    const list = db.guilds[gid]?.warnings?.[uid] || [];
    if (list.length === 0) return msg.reply("✅ No warnings.");

    let text = list.map((w,i)=>`${i+1}. **${w.reason}** — <@${w.moderator}>`).join("\n");
    msg.reply(`⚠️ **Warnings for ${member.user.tag}:**\n${text}`);
  }
}