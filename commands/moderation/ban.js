export default {
  name: "ban",
  description: "Ban a user",
  async execute(msg, args) {
    const member = msg.mentions.members.first();
    if (!msg.member.permissions.has("BanMembers")) return msg.reply("No permission.");
    if (!member) return msg.reply("Mention someone to ban.");
    const reason = args.slice(1).join(" ") || "No reason";
    try {
      await member.ban({reason});
      msg.reply(`✅ Banned **${member.user.tag}** | ${reason}`);
    } catch(e){ msg.reply("❌ Failed to ban."); }
  }
}