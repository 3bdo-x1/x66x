export default {
  name: "rizz",
  description: "Pickup line",
  async execute(msg) {
    const lines = ["Are you a keyboard? Because you're my type.", "Do you believe in love at first sight or should I walk by again?"];
    msg.reply({ embeds: [{ color: 0xFF33A8, title: "💖 Rizz", description: lines[Math.floor(Math.random() * lines.length)] }] });
  }
}