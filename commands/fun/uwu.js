export default {
  name: "uwu",
  description: "Uwu-ify text",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide text.");
    const t = args.join(" ").replace(/r/g,"w").replace(/l/g,"w");
    msg.reply({ embeds: [{ color: 0xFFC0CB, title: "🥺 Uwu", description: t }] });
  }
}