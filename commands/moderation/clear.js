export default {
  name: "clear",
  description: "Delete messages",
  async execute(msg, args) {
    const amount = parseInt(args[0]);
    if (!msg.member.permissions.has("ManageMessages")) return msg.reply("No permission.");
    if (!amount || amount < 1 || amount > 100) return msg.reply("Pick 1-100.");
    try {
      await msg.channel.bulkDelete(amount, true);
      msg.reply(`✅ Deleted **${amount}** messages.`).then(m=>setTimeout(()=>m.delete(),3000));
    } catch(e){ msg.reply("❌ Failed to clear."); }
  }
}