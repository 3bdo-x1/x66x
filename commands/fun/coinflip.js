export default {
  name: "coinflip",
  description: "Flip a coin",
  async execute(msg) {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    msg.reply({ embeds: [{ color: 0xF1C40F, title: "🪙 Coinflip", description: `Result: **${result}**` }] });
  }
}