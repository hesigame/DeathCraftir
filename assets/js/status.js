/* DeathCraft - live server status (tries several public APIs in order) */
(function () {
  var HOST = 'play.deathcraft.ir';
  var APIS = [
    { url: 'https://api.mcsrvstat.us/3/' + HOST, type: 'mcsrvstat' },
    { url: 'https://api.mcstatus.io/v2/status/java/' + HOST, type: 'mcstatus' },
    { url: 'https://api.minetools.eu/ping/' + HOST + '/25565', type: 'minetools' }
  ];

  function parse(api, d) {
    if (api.type === 'minetools') {
      return { online: !d.error, players: d.players || {}, version: d.version && d.version.name, protocol: d.version && d.version.protocol };
    }
    return {
      online: d.online === true,
      players: d.players || {},
      version: api.type === 'mcsrvstat' ? d.version : d.version && d.version.name,
      protocol: api.type === 'mcsrvstat' ? d.protocol && d.protocol.version : d.version && d.version.protocol,
      icon: d.icon
    };
  }

  function set(name, value) {
    document.querySelectorAll('[data-st="' + name + '"]').forEach(function (el) {
      if (name === 'icon') el.src = value; else el.textContent = value;
    });
  }

  function render(s) {
    document.querySelectorAll('[data-st="dot"]').forEach(function (el) {
      el.className = 'dot ' + (s.online ? 'on' : 'off');
    });
    set('label', s.online ? 'آنلاین' : 'آفلاین');
    set('players', s.online ? (s.players.online || 0) + ' / ' + (s.players.max || 0) : '0');
    set('version', s.online && s.version ? s.version : '-');
    set('protocol', s.protocol || '-');
    if (s.icon) set('icon', s.icon);
    set('updated', new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    document.querySelectorAll('[data-st="label"].tint').forEach(function (el) {
      el.className = 'tint ' + (s.online ? 'on' : 'off');
    });
  }

  async function check() {
    for (var i = 0; i < APIS.length; i++) {
      try {
        var r = await fetch(APIS[i].url + '?t=' + Date.now());
        if (!r.ok) continue;
        var s = parse(APIS[i], await r.json());
        if (s.online) return render(s);
      } catch (e) { /* try the next API */ }
    }
    render({ online: false, players: {} });
  }

  if (document.querySelector('[data-st]')) {
    check();
    setInterval(check, 30000);
  }
})();
