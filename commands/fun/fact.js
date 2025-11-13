export default {
  name: "fact",
  description: "Random fact",
  async execute(msg) {
    const facts = ["Honey never spoils.", "Bananas are berries.", "Octopuses have 3 hearts."];
    msg.reply({ embeds: [{ color: 0x1ABC9C, title: "📘 Fact", description: facts[Math.floor(Math.random() * facts.length)] }] });
  }
}