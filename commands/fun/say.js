export default {
  name: "say",
  description: "Bot says your message",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    msg.reply({ embeds: [{ color: 0x3498DB, title: "🗣️ Say", description: args.join(" ") }] });
  }
}