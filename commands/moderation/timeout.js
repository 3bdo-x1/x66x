export default {
  name: "timeout",
  description: "Timeout a user",
  async execute(msg, args) {
    const member = msg.mentions.members.first();
    if (!msg.member.permissions.has("ModerateMembers")) return msg.reply("No permission.");
    if (!member) return msg.reply("Mention someone.");

    const ms = parseInt(args[1]) * 1000 || 0;
    const reason = args.slice(2).join(" ") || "No reason";

    try {
      await member.timeout(ms, reason);
      msg.reply(`⏱️ Timed out **${member.user.tag}** for ${args[1]}s`);
    } catch { msg.reply("❌ Failed."); }
  }
}