export default {
  name: "gifsearch",
  description: "Search random GIF",
  async execute(msg, args) {
    if (!args.length) return msg.reply("❌ Provide a search term.");
    const q = args.join("+");
    const url = `https://g.tenor.com/v1/search?q=${q}&key=LIVDSRZULELA&limit=10`;
    try {
      const fetch = (await import("node-fetch")).default;
      const res = await fetch(url);
      const json = await res.json();
      if (!json.results.length) return msg.reply("No GIFs found.");
      const gif = json.results[Math.floor(Math.random() * json.results.length)].media[0].gif.url;
      msg.reply({ embeds: [{ color: 0x7289DA, title: "🔎 GIF Search", image: { url: gif } }] });
    } catch {
      msg.reply("❌ Error fetching GIF.");
    }
  }
}