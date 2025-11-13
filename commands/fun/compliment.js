export default {
  name: "compliment",
  description: "Send a compliment",
  async execute(msg) {
    const lines = ["You look great today!", "You're amazing!", "Your energy is unmatched!", "You’re doing great!"];
    const pick = lines[Math.floor(Math.random() * lines.length)];
    msg.reply({ embeds: [{ color: 0xFF66CC, title: "💗 Compliment", description: pick }] });
  }
}