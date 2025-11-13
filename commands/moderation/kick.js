export default {
  name: "kick",
  description: "Kick a user",
  async execute(msg, args) {
    const member = msg.mentions.members.first();
    if (!msg.member.permissions.has("KickMembers")) return msg.reply("No permission.");
    if (!member) return msg.reply("Mention someone to kick.");
    const reason = args.slice(1).join(" ") || "No reason";
    try {
      await member.kick(reason);
      msg.reply(`✅ Kicked **${member.user.tag}** | ${reason}`);
    } catch(e){ msg.reply("❌ Failed to kick."); }
  }
}