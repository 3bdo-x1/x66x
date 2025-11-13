export default {
  name: "slowmode",
  description: "Set slowmode",
  async execute(msg, args) {
    if (!msg.member.permissions.has("ManageChannels")) return msg.reply("No permission.");
    const sec = parseInt(args[0]) || 0;
    try {
      await msg.channel.setRateLimitPerUser(sec);
      msg.reply(`✅ Slowmode set to **${sec}s**.`);
    } catch { msg.reply("❌ Failed."); }
  }
}