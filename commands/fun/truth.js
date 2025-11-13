export default {
  name: "truth",
  description: "Truth question",
  async execute(msg) {
    const q = ["What's your biggest fear?", "Who was your last crush?", "What's your worst habit?"];
    msg.reply({ embeds: [{ color: 0x1ABC9C, title: "❓ Truth", description: q[Math.floor(Math.random() * q.length)] }] });
  }
}