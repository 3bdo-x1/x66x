export default {
  name: 'ping',
  description: 'ping command',
  async execute(msg, args) {
    const sent = await msg.reply('Pinging...'); sent.edit(`Pong! ${sent.createdTimestamp - msg.createdTimestamp}ms`);
  }
};
