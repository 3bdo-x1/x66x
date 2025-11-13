export default {
  name: "purge",
  description: "Bulk delete messages fast",
  async execute(msg, args) {
    if (!msg.member.permissions.has("ManageMessages")) return msg.reply("No permission.");
    const amount = parseInt(args[0]);
    if (!amount || amount < 2 || amount > 200) return msg.reply("Pick 2-200.");
    try {
      let deleted = 0;
      while (deleted < amount) {
        const del = Math.min(100, amount - deleted);
        const messages = await msg.channel.bulkDelete(del, true);
        deleted += messages.size;
      }
      msg.reply(`✅ Purged **${deleted}** messages.`);
    } catch { msg.reply("❌ Failed purge."); }
  }
}