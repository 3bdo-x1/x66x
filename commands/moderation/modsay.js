export default {
  name: "modsay",
  description: "Send a mod message",
  async execute(msg, args) {
    if (!msg.member.permissions.has("ManageMessages")) return msg.reply("No permission.");
    const text = args.join(" ");
    if (!text) return msg.reply("Write something.");
    msg.delete();
    msg.channel.send(`📢 **Mod Message:** ${text}`);
  }
}