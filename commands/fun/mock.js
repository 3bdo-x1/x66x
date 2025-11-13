export default {
  name: "mock",
  description: "Mock text",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    const t = args.join(" ");
    msg.reply({ embeds: [{ color: 0xC0392B, title: "🪞 Mock", description: [...t].map((c,i)=> i%2?c.toUpperCase():c.toLowerCase()).join("") }] });
  }
}