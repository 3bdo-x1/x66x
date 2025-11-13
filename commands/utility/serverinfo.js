export default {
  name: 'serverinfo',
  description: 'serverinfo command',
  async execute(msg, args) {
    msg.reply(`Server: ${msg.guild.name} | Members: ${msg.guild.memberCount}`);
  }
};
