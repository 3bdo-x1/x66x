export default {
  name: "roast",
  description: "Roast someone",
  async execute(msg, args) {
    const target = args.join(" ") || "you";
    const lines = ["You have the personality of wet bread.", "Your brain has left the chat."];
    msg.reply({ embeds: [{ color: 0xE74C3C, title: "🔥 Roast", description: `**${target}**, ${lines[Math.floor(Math.random() * lines.length)]}` }] });
  }
}