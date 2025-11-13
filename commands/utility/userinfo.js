export default {
  name: 'userinfo',
  description: 'userinfo command',
  async execute(msg, args) {
    const member = msg.mentions.members.first() || msg.member;
    msg.reply(`User: ${member.user.tag} | ID: ${member.id}`);
  }
};
