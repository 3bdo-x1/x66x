export default {
  name: "joke",
  description: "Random joke",
  async execute(msg) {
    const jokes = ["Why did the chicken cross the road? To get to the other side!", "I told my computer I needed a break… now it won’t stop sending me KitKats."];
    msg.reply({ embeds: [{ color: 0xF39C12, title: "😂 Joke", description: jokes[Math.floor(Math.random() * jokes.length)] }] });
  }
}