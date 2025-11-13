export default {
  name: "dice",
  description: "Roll a dice",
  async execute(msg) {
    const roll = Math.floor(Math.random() * 6) + 1;
    msg.reply({ embeds: [{ color: 0x2ECC71, title: "🎲 Dice Roll", description: `You rolled **${roll}**` }] });
  }
}