export default {
  name: "8ball",
  description: "Magic 8ball answer",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Ask a full question.");
    const responses = ["Yes", "No", "Maybe", "Definitely", "Absolutely not", "Try again"];
    const pick = responses[Math.floor(Math.random() * responses.length)];
    msg.reply({ embeds: [{ color: 0x5865F2, title: "🎱 8Ball", description: `**Question:** ${args.join(" ")}\n**Answer:** ${pick}` }] });
  }
}