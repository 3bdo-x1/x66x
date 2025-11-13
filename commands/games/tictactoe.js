import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export default {
  name: "ttt",
  description: "Play Tic Tac Toe using the command TTT.",
  async execute(msg) {

    const opponent = msg.mentions.users.first();
    if (!opponent) return msg.channel.send("Tag someone to play TTT.");

    if (opponent.bot) return msg.channel.send("You cannot play with bots.");
    if (opponent.id === msg.author.id) return msg.channel.send("You cannot play with yourself.");

    // X goes first
    let current = msg.author.id;

    // Board state
    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // Generate buttons
    function getBoardComponents() {
      const rows = [];

      for (let r = 0; r < 3; r++) {
        const row = new ActionRowBuilder();

        for (let c = 0; c < 3; c++) {
          const i = r * 3 + c;

          const btn = new ButtonBuilder()
            .setCustomId(`ttt_${i}`)
            .setStyle(
              board[i] === "X" ? ButtonStyle.Danger :
              board[i] === "O" ? ButtonStyle.Success :
              ButtonStyle.Secondary
            )
            .setLabel(board[i] === " " ? " " : board[i]); // ✅ LABEL FIXED

          row.addComponents(btn);
        }

        rows.push(row);
      }

      return rows;
    }

    const gameMsg = await msg.channel.send({
      content: `🎮 **Tic-Tac-Toe (TTT)**  
<@${current}> goes first.`,
      components: getBoardComponents()
    });

    // Collector
    const collector = gameMsg.createMessageComponentCollector({
      time: 180000
    });

    collector.on("collect", async i => {
      if (![msg.author.id, opponent.id].includes(i.user.id)) {
        return i.reply({ content: "This game is not for you.", ephemeral: true });
      }

      if (i.user.id !== current) {
        return i.reply({ content: "Wait for your turn.", ephemeral: true });
      }

      const pos = parseInt(i.customId.split("_")[1]);

      if (board[pos] !== " ") {
        return i.reply({ content: "This spot is already taken.", ephemeral: true });
      }

      board[pos] = current === msg.author.id ? "X" : "O";

      current = current === msg.author.id ? opponent.id : msg.author.id;

      // Check winner
      const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      for (const w of wins) {
        const [a,b,c] = w;
        if (board[a] !== " " && board[a] === board[b] && board[b] === board[c]) {
          collector.stop("win");
          return i.update({
            content: `✅ **<@${i.user.id}> wins the TTT game!**`,
            components: getBoardComponents()
          });
        }
      }

      // Check draw
      if (!board.includes(" ")) {
        collector.stop("draw");
        return i.update({
          content: `🤝 **It's a draw!**`,
          components: getBoardComponents()
        });
      }

      // Continue game
      return i.update({
        content: `🎮 **Tic-Tac-Toe**  
<@${current}>'s turn.`,
        components: getBoardComponents()
      });
    });

    collector.on("end", async (_c, reason) => {
      if (reason === "time") {
        gameMsg.edit({
          content: "⏳ Game ended due to inactivity.",
          components: getBoardComponents()
        });
      }
    });
  }
};
