export default {
  name: "unlock",
  description: "Unlock the channel",
  async execute(msg) {
    if (!msg.member.permissions.has("ManageChannels")) return msg.reply("No permission.");
    try {
      await msg.channel.permissionOverwrites.edit(msg.guild.id,{SendMessages:true});
      msg.reply("🔓 Channel unlocked.");
    } catch { msg.reply("❌ Failed."); }
  }
}