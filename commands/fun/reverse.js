export default {
  name: "reverse",
  description: "Reverse text",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    msg.reply({ embeds: [{ color: 0x8E44AD, title: "🔁 Reverse", description: args.join(" ").split("").reverse().join("") }] });
  }
}