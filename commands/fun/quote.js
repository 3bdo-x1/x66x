export default {
  name: "quote",
  description: "Random quote",
  async execute(msg) {
    const quotes = ["Believe in yourself.", "Every day is a chance to grow.", "Stay focused and keep moving."];
    msg.reply({ embeds: [{ color: 0x27AE60, title: "📜 Quote", description: quotes[Math.floor(Math.random() * quotes.length)] }] });
  }
}