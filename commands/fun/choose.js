export default {
  name: "choose",
  description: "Choose between options",
  async execute(msg, args) {
    if (args.length < 2) return msg.reply("❌ Provide at least two options.");
    const pick = args[Math.floor(Math.random() * args.length)];
    msg.reply({ embeds: [{ color: 0x3498DB, title: "🎯 Choice", description: `Options: ${args.join(", ")}\nChosen: **${pick}**` }] });
  }
}