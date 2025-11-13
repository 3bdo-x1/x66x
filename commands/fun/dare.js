export default {
  name: "dare",
  description: "Give a dare",
  async execute(msg) {
    const dares = ["Do 10 push-ups!", "Say hello to 3 people!", "Send a funny meme!", "Compliment someone here!"];
    msg.reply({ embeds: [{ color: 0xE67E22, title: "🔥 Dare", description: dares[Math.floor(Math.random() * dares.length)] }] });
  }
}