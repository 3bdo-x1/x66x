export default {
  name: "emojiwave",
  description: "Make a wave with emojis",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    const text = args.join(" ");
    msg.reply({ embeds: [{ color: 0x9B59B6, title: "🌊 Emoji Wave", description: text.split("").join(" ") }] });
  }
}