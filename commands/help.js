import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  EmbedBuilder
} from "discord.js";

export default {
  name: "help",
  description: "Professional help menu",

  async execute(msg) {

    const thumbs = {
      home: "https://media.tenor.com/tG2dh0dX8CQAAAAj/galaxy-space.gif",
      fun: "https://media.tenor.com/6VidZ7-ogW4AAAAj/party.gif",
      games: "https://media.tenor.com/MqJHaYtVf2gAAAAj/gamer-keys.gif",
      mod: "https://media.tenor.com/h1I5pVsQt1MAAAAM/security.gif",
      util: "https://media.tenor.com/sT4W6-wH2FQAAAAj/tools.gif",
      memes: "https://media.tenor.com/DrFq1YdNvBIAAAAM/meme.gif"
    };

    // EMBEDS (CLEAN + NO ERRORS)
    const pages = {
      home: new EmbedBuilder()
        .setColor(0x3A6DFF)
        .setThumbnail(thumbs.home)
        .setTitle("🌐  X66 Command Center")
        .setDescription(
          "━━━━━━━━━━━━━━━━━━━━\n" +
          "✨ **Welcome to your command headquarters.** ✨\n" +
          "Clean • Professional • Organized\n" +
          "━━━━━━━━━━━━━━━━━━━━\n" +
          "Use the **menu** or **buttons** below to browse.\n" +
          "Every command is optimized for speed and clarity.\n"
        ),

      fun: new EmbedBuilder()
        .setColor(0xF1C40F)
        .setThumbnail(thumbs.fun)
        .setTitle("🎉 Fun Commands")
        .setDescription(
          "8ball - prediction\n" +
          "joke - random joke\n" +
          "roast - playful roast\n" +
          "compliment - nice compliment\n" +
          "sarcasm - sarcastic text\n" +
          "mock - alternating caps\n" +
          "uwu - uwu text\n" +
          "reverse - reverse text\n" +
          "say - repeat message\n" +
          "emojiwave - emoji wave\n" +
          "coinflip - heads/tails\n" +
          "dice - roll dice\n" +
          "choose - random pick\n" +
          "fact - random fact\n" +
          "truth - truth prompt\n" +
          "dare - dare prompt\n" +
          "rizz - pickup line\n" +
          "quote - motivational quote\n" +
          "gifsearch - gif search\n" +
          "tictactoe - TTT game\n"
        ),

      games: new EmbedBuilder()
        .setColor(0x2ECC71)
        .setThumbnail(thumbs.games)
        .setTitle("🎮 Games")
        .setDescription(
          "blackjack - card game\n" +
          "capitalquiz - guess capitals\n" +
          "connect4 - connect four\n" +
          "defuse - bomb game\n" +
          "duel - reaction duel\n" +
          "fastclick - fastest click\n" +
          "flags - guess flag\n" +
          "flood - avoid rising water\n" +
          "hangman - guess word\n" +
          "mathrace - solve fast\n" +
          "memory - match tiles\n" +
          "mines - minesweeper\n" +
          "numberguess - guess number\n" +
          "race - typing race\n" +
          "rps - rock paper scissors\n" +
          "shoot - reaction duel\n" +
          "slots - slot machine\n" +
          "tictactoe - xo game\n" +
          "typebattle - type fight\n" +
          "typing - typing speed test\n"
        ),

      mod: new EmbedBuilder()
        .setColor(0xE74C3C)
        .setThumbnail(thumbs.mod)
        .setTitle("🛡️ Moderation")
        .setDescription(
          "ban - ban user\n" +
          "kick - kick user\n" +
          "mute - mute user\n" +
          "unmute - remove mute\n" +
          "timeout - timeout user\n" +
          "untimeout - remove timeout\n" +
          "clear - delete messages\n" +
          "purge - bulk delete\n" +
          "slowmode - chat cooldown\n" +
          "nick - set nickname\n" +
          "warn - add warning\n" +
          "warnings - list warnings\n" +
          "lock - lock channel\n" +
          "unlock - unlock channel\n" +
          "hide - hide channel\n" +
          "unhide - show channel\n" +
          "role - add role\n" +
          "unrole - remove role\n"
        ),

      util: new EmbedBuilder()
        .setColor(0x3498DB)
        .setThumbnail(thumbs.util)
        .setTitle("🧰 Utility")
        .setDescription(
          "ping - bot latency\n" +
          "avatar - show avatar\n" +
          "userinfo - user details\n" +
          "serverinfo - server info\n" +
          "channelinfo - channel info\n" +
          "weather - weather data\n" +
          "iplookup - IP info\n" +
          "timestamp - time tool\n" +
          "shorturl - shorten URL\n" +
          "remind - reminders\n" +
          "poll - make poll\n" +
          "todo - todo list\n" +
          "uptime - bot uptime\n" +
          "botstats - system stats\n"
        ),

      memes: new EmbedBuilder()
        .setColor(0xF06292)
        .setThumbnail(thumbs.memes)
        .setTitle("🤣 Meme Commands")
        .setDescription(
          "meme - random meme\n" +
          "punch - punch effect\n" +
          "slap - slap effect\n" +
          "jail - jail overlay\n" +
          "blur - blur face\n" +
          "pixel - pixel effect\n" +
          "deepfry - fry effect\n" +
          "delete - delete meme\n" +
          "drake - drake meme\n" +
          "thuglife - thug edit\n" +
          "wasted - gta wasted\n" +
          "caption - caption text\n" +
          "demotivational - poster gen\n"
        )
    };

    const order = ["home", "fun", "games", "mod", "util", "memes"];
    let index = 0;

    // ✅ BUTTONS
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("prev").setLabel("◀️").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("next").setLabel("▶️").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("stop").setLabel("⏹ Close").setStyle(ButtonStyle.Danger)
    );

    // ✅ DROPDOWN
    const dropdown = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("category_select")
        .setPlaceholder("Select category…")
        .addOptions(
          { label: "🏠 Home", value: "home" },
          { label: "🎉 Fun", value: "fun" },
          { label: "🎮 Games", value: "games" },
          { label: "🛡️ Moderation", value: "mod" },
          { label: "🧰 Utility", value: "util" },
          { label: "🤣 Memes", value: "memes" }
        )
    );

    // ✅ SEND FIRST PAGE
    const helpMsg = await msg.reply({
      embeds: [pages[order[index]]],
      components: [buttons, dropdown]
    });

    const collector = helpMsg.createMessageComponentCollector({ time: 180000 });

    collector.on("collect", async i => {

      if (i.user.id !== msg.author.id)
        return i.reply({ content: "Not your menu.", ephemeral: true });

      if (i.customId === "prev") {
        index = (index - 1 + order.length) % order.length;
        return i.update({ embeds: [pages[order[index]]], components: [buttons, dropdown] });
      }

      if (i.customId === "next") {
        index = (index + 1) % order.length;
        return i.update({ embeds: [pages[order[index]]], components: [buttons, dropdown] });
      }

      if (i.customId === "category_select") {
        index = order.indexOf(i.values[0]);
        return i.update({ embeds: [pages[order[index]]], components: [buttons, dropdown] });
      }

      if (i.customId === "stop") {
        return i.update({ content: "Menu closed.", embeds: [], components: [] });
      }

    });

  }
};
