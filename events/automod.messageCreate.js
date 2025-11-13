import fs from 'fs';
import path from 'path';

export default (client) => {
  const config = client.config;
  const dataPath = client.dataPath;

  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // ignore if author has manage_guild
    if (message.member && message.member.permissions.has('ManageGuild')) return;

    const guildData = JSON.parse(fs.readFileSync(dataPath, 'utf8')).guilds || {};
    const gconf = config.automod;
    const guildId = message.guild.id;
    const custom = guildData[guildId]?.badWords || [];

    const content = message.content;
    const contentLower = content.toLowerCase();

    // 1) bad words
    const badSet = new Set([...gconf.badWords.map(w => w.toLowerCase()), ...custom.map(w => w.toLowerCase())]);
    for (const w of badSet) {
      if (!w) continue;
      const re = new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (re.test(contentLower)) {
        try { await message.delete(); } catch {}
        try { await message.channel.send(`${message.author} — message removed (profanity).`); } catch {}
        return;
      }
    }

    // 2) invite filter
    if (contentLower.includes('discord.gg/') || contentLower.includes('discord.com/invite/')) {
      try { await message.delete(); } catch {}
      try { await message.channel.send(`${message.author} — invites are not allowed.`); } catch {}
      return;
    }

    // 3) caps guard
    if (content.length >= gconf.minCapsLength) {
      const letters = [...content].filter(c => /[A-Za-z]/.test(c)).length;
      if (letters > 0) {
        const caps = [...content].filter(c => /[A-Z]/.test(c)).length;
        if ((caps / letters) * 100 >= gconf.maxCapsPercent) {
          try { await message.delete(); } catch {}
          try { await message.channel.send(`${message.author} — excessive caps.`); } catch {}
          return;
        }
      }
    }

    // 4) mass mentions
    if (message.mentions && message.mentions.users.size >= gconf.maxMentions) {
      try { await message.delete(); } catch {}
      try { await message.channel.send(`${message.author} — too many mentions.`); } catch {}
      return;
    }
  });
};
