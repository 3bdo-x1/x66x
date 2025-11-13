import fs from 'fs';

export default (client) => {
  const config = client.config;
  const windows = {
    ban: config.antinuke.window,
    kick: config.antinuke.window,
    channel_delete: config.antinuke.window,
    role_delete: config.antinuke.window
  };

  // track: guildId -> action -> [{ts, userId, targetId}]
  client._antinukeLogs = {};

  function record(guildId, action, userId, targetId) {
    if (!client._antinukeLogs[guildId]) client._antinukeLogs[guildId] = {};
    if (!client._antinukeLogs[guildId][action]) client._antinukeLogs[guildId][action] = [];
    const now = Date.now()/1000;
    client._antinukeLogs[guildId][action].push({ts: now, userId, targetId});
    // cleanup old
    client._antinukeLogs[guildId][action] = client._antinukeLogs[guildId][action].filter(x => x.ts >= now - windows[action] - 1);
    const count = client._antinukeLogs[guildId][action].filter(x => x.userId === userId).length;
    let threshold = 99;
    if (action === 'ban') threshold = config.antinuke.banThreshold;
    if (action === 'kick') threshold = config.antinuke.kickThreshold;
    if (action === 'channel_delete') threshold = config.antinuke.channelDeleteThreshold;
    if (action === 'role_delete') threshold = config.antinuke.roleDeleteThreshold;
    if (count >= threshold) {
      mitigate(guildId, userId, action, count);
    }
  }

  async function mitigate(guildId, userId, action, count) {
    try {
      const guild = await client.guilds.fetch(guildId);
      const member = await guild.members.fetch(userId).catch(() => null);
      if (!member) return;
      if (member.id === guild.ownerId) return;
      const reason = `Auto mitigation for ${action} (${count})`;
      // remove dangerous roles
      for (const r of member.roles.cache.values()) {
        const perms = r.permissions;
        if (perms.has('ManageGuild') || perms.has('BanMembers') || perms.has('ManageRoles') || perms.has('ManageChannels')) {
          try { await member.roles.remove(r, reason); } catch {}
        }
      }
      // try ban
      try { await guild.bans.create(member.id, {reason}); } catch { try { await member.kick(reason); } catch {} }
      // notify owner
      try { const owner = await client.users.fetch(guild.ownerId); owner.send(`AntiNuke: action taken against ${member.user.tag} for ${action} (count=${count}) in ${guild.name}`); } catch {}
    } catch (err) {
      console.error('Mitigate error', err);
    }
  }

  client.on('guildBanAdd', async (ban) => {
    const guild = ban.guild;
    const user = ban.user;
    const logs = await guild.fetchAuditLogs({type: 22, limit: 6}).catch(() => null); // BAN
    if (!logs) return;
    const entry = logs.entries.find(e => e.targetId === String(user.id));
    if (entry) record(guild.id, 'ban', entry.executorId || entry.executor?.id || entry.executor?.user?.id, user.id);
  });

  client.on('guildMemberRemove', async (member) => {
    // check kick audit
    const guild = member.guild;
    const logs = await guild.fetchAuditLogs({type: 20, limit: 6}).catch(() => null); // KICK
    if (!logs) return;
    const entry = logs.entries.find(e => e.targetId === String(member.id));
    if (entry) record(guild.id, 'kick', entry.executorId || entry.executor?.id || entry.executor?.user?.id, member.id);
  });

  client.on('channelDelete', async (channel) => {
    const guild = channel.guild;
    const logs = await guild.fetchAuditLogs({type: 12, limit: 6}).catch(() => null); // CHANNEL_DELETE
    if (!logs) return;
    const entry = logs.entries.find(e => e.targetId === String(channel.id));
    if (entry) record(guild.id, 'channel_delete', entry.executorId || entry.executor?.id || entry.executor?.user?.id, channel.id);
  });

  client.on('roleDelete', async (role) => {
    const guild = role.guild;
    const logs = await guild.fetchAuditLogs({type: 30, limit: 6}).catch(() => null); // ROLE_DELETE
    if (!logs) return;
    const entry = logs.entries.find(e => e.targetId === String(role.id));
    if (entry) record(guild.id, 'role_delete', entry.executorId || entry.executor?.id || entry.executor?.user?.id, role.id);
  });
};
