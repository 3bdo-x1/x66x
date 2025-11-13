export default {
  name: "lock",
  description: "Lock the channel",
  async execute(msg) {
    if (!msg.member.permissions.has("ManageChannels")) return msg.reply("No permission.");
    try {
      await msg.channel.permissionOverwrites.edit(msg.guild.id,{SendMessages:false});
      msg.reply("🔒 Channel locked.");
    } catch { msg.reply("❌ Failed."); }
  }
}