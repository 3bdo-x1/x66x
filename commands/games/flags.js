export default {
  name: "flags",
  description: "Multiplayer flag guessing game with difficulty levels and top 3 winners.",
  async execute(msg, args) {
    const difficulty = (args[0] || "").toLowerCase();
    const rounds = parseInt(args[1]);

    if (!["easy", "medium", "hard"].includes(difficulty) || !rounds) {
      return msg.reply("Usage: **!flags <easy|medium|hard> <rounds>**");
    }

    const FLAGS = {
      "afghanistan": "https://flagcdn.com/w320/af.png",
      "albania": "https://flagcdn.com/w320/al.png",
      "algeria": "https://flagcdn.com/w320/dz.png",
      "andorra": "https://flagcdn.com/w320/ad.png",
      "armenia": "https://flagcdn.com/w320/am.png",
      "austria": "https://flagcdn.com/w320/at.png",
      "azerbaijan": "https://flagcdn.com/w320/az.png",
      "bahrain": "https://flagcdn.com/w320/bh.png",
      "bangladesh": "https://flagcdn.com/w320/bd.png",
      "belgium": "https://flagcdn.com/w320/be.png",
      "bhutan": "https://flagcdn.com/w320/bt.png",
      "bosnia and herzegovina": "https://flagcdn.com/w320/ba.png",
      "bulgaria": "https://flagcdn.com/w320/bg.png",
      "china": "https://flagcdn.com/w320/cn.png",
      "croatia": "https://flagcdn.com/w320/hr.png",
      "cyprus": "https://flagcdn.com/w320/cy.png",
      "czech republic": "https://flagcdn.com/w320/cz.png",
      "denmark": "https://flagcdn.com/w320/dk.png",
      "egypt": "https://flagcdn.com/w320/eg.png",
      "estonia": "https://flagcdn.com/w320/ee.png",
      "finland": "https://flagcdn.com/w320/fi.png",
      "france": "https://flagcdn.com/w320/fr.png",
      "georgia": "https://flagcdn.com/w320/ge.png",
      "germany": "https://flagcdn.com/w320/de.png",
      "greece": "https://flagcdn.com/w320/gr.png",
      "hungary": "https://flagcdn.com/w320/hu.png",
      "iceland": "https://flagcdn.com/w320/is.png",
      "india": "https://flagcdn.com/w320/in.png",
      "indonesia": "https://flagcdn.com/w320/id.png",
      "iran": "https://flagcdn.com/w320/ir.png",
      "iraq": "https://flagcdn.com/w320/iq.png",
      "ireland": "https://flagcdn.com/w320/ie.png",
      "israel": "https://flagcdn.com/w320/il.png",
      "italy": "https://flagcdn.com/w320/it.png",
      "japan": "https://flagcdn.com/w320/jp.png",
      "jordan": "https://flagcdn.com/w320/jo.png",
      "kazakhstan": "https://flagcdn.com/w320/kz.png",
      "kuwait": "https://flagcdn.com/w320/kw.png",
      "kyrgyzstan": "https://flagcdn.com/w320/kg.png",
      "laos": "https://flagcdn.com/w320/la.png",
      "latvia": "https://flagcdn.com/w320/lv.png",
      "lebanon": "https://flagcdn.com/w320/lb.png",
      "libya": "https://flagcdn.com/w320/ly.png",
      "lithuania": "https://flagcdn.com/w320/lt.png",
      "luxembourg": "https://flagcdn.com/w320/lu.png",
      "malaysia": "https://flagcdn.com/w320/my.png",
      "maldives": "https://flagcdn.com/w320/mv.png",
      "malta": "https://flagcdn.com/w320/mt.png",
      "mexico": "https://flagcdn.com/w320/mx.png",
      "monaco": "https://flagcdn.com/w320/mc.png",
      "mongolia": "https://flagcdn.com/w320/mn.png",
      "morocco": "https://flagcdn.com/w320/ma.png",
      "nepal": "https://flagcdn.com/w320/np.png",
      "netherlands": "https://flagcdn.com/w320/nl.png",
      "new zealand": "https://flagcdn.com/w320/nz.png",
      "norway": "https://flagcdn.com/w320/no.png",
      "oman": "https://flagcdn.com/w320/om.png",
      "pakistan": "https://flagcdn.com/w320/pk.png",
      "palestine": "https://flagcdn.com/w320/ps.png",
      "philippines": "https://flagcdn.com/w320/ph.png",
      "poland": "https://flagcdn.com/w320/pl.png",
      "portugal": "https://flagcdn.com/w320/pt.png",
      "qatar": "https://flagcdn.com/w320/qa.png",
      "romania": "https://flagcdn.com/w320/ro.png",
      "russia": "https://flagcdn.com/w320/ru.png",
      "saudi arabia": "https://flagcdn.com/w320/sa.png",
      "serbia": "https://flagcdn.com/w320/rs.png",
      "singapore": "https://flagcdn.com/w320/sg.png",
      "slovakia": "https://flagcdn.com/w320/sk.png",
      "slovenia": "https://flagcdn.com/w320/si.png",
      "south korea": "https://flagcdn.com/w320/kr.png",
      "spain": "https://flagcdn.com/w320/es.png",
      "sri lanka": "https://flagcdn.com/w320/lk.png",
      "syria": "https://flagcdn.com/w320/sy.png",
      "tajikistan": "https://flagcdn.com/w320/tj.png",
      "thailand": "https://flagcdn.com/w320/th.png",
      "tunisia": "https://flagcdn.com/w320/tn.png",
      "turkey": "https://flagcdn.com/w320/tr.png",
      "turkmenistan": "https://flagcdn.com/w320/tm.png",
      "uae": "https://flagcdn.com/w320/ae.png",
      "ukraine": "https://flagcdn.com/w320/ua.png",
      "uk": "https://flagcdn.com/w320/gb.png",
      "usa": "https://flagcdn.com/w320/us.png",
      "uzbekistan": "https://flagcdn.com/w320/uz.png",
      "vietnam": "https://flagcdn.com/w320/vn.png",
      "yemen": "https://flagcdn.com/w320/ye.png"
    };

    let entries = Object.entries(FLAGS).sort(() => Math.random() - 0.5);

    if (difficulty === "easy") entries = entries.slice(0, 120);
    if (difficulty === "medium") entries = entries.slice(0, 180);
    // hard = full list (190+)

    const scores = {};

    await msg.channel.send({
      embeds: [{
        color: 0x00A8FF,
        title: "🌍 Flag Guessing Game",
        description:
          `**Difficulty:** ${difficulty}\n` +
          `**Rounds:** ${rounds}\n\n` +
          `✅ Correct = Next flag instantly\n` +
          `✅ Wrong = ignored\n` +
          `✅ 15s timeout if nobody answers`
      }]
    });

    for (let round = 1; round <= rounds; round++) {
      const [country, image] = entries[round - 1];

      await msg.channel.send({
        embeds: [{
          color: 0x3498DB,
          title: `Round ${round}/${rounds}`,
          description: "Guess the country!",
          image: { url: image }
        }]
      });

      let found = false;
      const collector = msg.channel.createMessageCollector({
        filter: m => !m.author.bot,
        time: 15000
      });

      collector.on("collect", m => {
        if (m.content.toLowerCase() === country.toLowerCase()) {
          found = true;
          collector.stop();
          if (!scores[m.author.id]) scores[m.author.id] = 0;
          scores[m.author.id]++;
          msg.channel.send(`✅ Correct by **${m.author.username}**!`);
        }
      });

      await new Promise(resolve => collector.on("end", resolve));

      if (!found) msg.channel.send(`⏳ No correct answer. It was **${country}**.`);
    }

    if (Object.keys(scores).length === 0)
      return msg.channel.send("Nobody scored this time!");

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const winners = sorted.slice(0, 3);

    const roleName = "🏆 Flag Champion";
    let role = msg.guild.roles.cache.find(r => r.name === roleName);
    if (!role) role = await msg.guild.roles.create({ name: roleName, color: 0xFFD700 });

    msg.guild.members.cache.forEach(m => {
      if (m.roles.cache.has(role.id)) m.roles.remove(role.id);
    });

    for (const [id] of winners) {
      const member = msg.guild.members.cache.get(id);
      if (member) await member.roles.add(role);
    }

    const winnerFields = winners.map(([id, score], i) => ({
      name: `#${i + 1}`,
      value: `<@${id}> — **${score} pts**`
    }));

    await msg.channel.send({
      embeds: [{
        color: 0x2ECC71,
        title: "🏁 Final Results",
        fields: winnerFields
      }]
    });
  }
}
