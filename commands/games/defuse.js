export default {
  name: "defuse",
  description: "Defuse the bomb mini-game",
  async execute(msg) {
    const wires = ["red", "blue", "green", "yellow"];
    const correct = wires[Math.floor(Math.random()*4)];

    msg.reply(`💣 Cut the correct wire: ${wires.map(w=>`**${w}**`).join(", ")}
You have 7 seconds.`);

    const filter = m => m.author.id === msg.author.id;
    const collected = await msg.channel.awaitMessages({
      filter,
      max: 1,
      time: 7000
    });

    if (!collected.size) return msg.reply("⏳ Boom. You failed.");

    const guess = collected.first().content.toLowerCase();

    if (guess === correct) msg.reply("✅ Bomb defused!");
    else msg.reply(`💥 Wrong wire. It was **${correct}**.`);
  }
}
