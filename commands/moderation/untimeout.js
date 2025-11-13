export default {
  name: "untimeout",
  description: "Remove timeout",
  async execute(msg, args) {
    const member = msg.mentions.members.first();
    if (!msg.member.permissions.has("ModerateMembers")) return msg.reply("No permission.");
    if (!member) return msg.reply("Mention someone.");

    try {
      await member.timeout(null);
      msg.reply(`✅ Removed timeout from **${member.user.tag}**`);
    } catch { msg.reply("❌ Failed."); }
  }
}