export default {
  name: "banlist",
  description: "Show banned users",
  async execute(msg) {
    if (!msg.member.permissions.has("BanMembers")) return msg.reply("No permission.");
    const bans = await msg.guild.bans.fetch();
    if (bans.size === 0) return msg.reply("✅ No banned users.");
    msg.reply("🚫 **Banned Users:**\n" + bans.map(b=>b.user.tag).join("\n"));
  }
}