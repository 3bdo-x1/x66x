export default {
  name: 'avatar',
  description: 'avatar command',
  async execute(msg, args) {
    const user = msg.mentions.users.first() || msg.author;
    msg.reply(user.displayAvatarURL({ size: 1024, extension: 'png' }));
  }
};
