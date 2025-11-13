export default {
  name: "sarcasm",
  description: "Sarcastic reply",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    const t = args.join(" ");
    msg.reply({ embeds: [{ color: 0x95A5A6, title: "🙄 Sarcasm", description: [...t].map(c=>Math.random()>0.5?c.toUpperCase():c.toLowerCase()).join("") }] });
  }
}