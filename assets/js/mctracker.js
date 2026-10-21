/* DeathCraft live stats. Uptime is read from the official MCTracker server page. */
(function () {
  'use strict';
  var PAGE_URL = 'https://mctracker.ir/servers/deathcraft';
  var PAGE_READER_URL = 'https://r.jina.ai/https://mctracker.ir/servers/deathcraft';
  var API_URL = 'https://mctracker.ir/api/server/715';

  function setUptime(value, source) {
    var el = document.querySelector('[data-uptime]');
    if (!el) return;
    if (value === null || !Number.isFinite(value) || value < 0 || value > 100) {
      el.textContent = 'مشاهده در MCTracker';
      el.removeAttribute('data-to');
      el.style.fontSize = '0.95rem';
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'link');
      el.setAttribute('tabindex', '0');
      el.setAttribute('title', 'باز کردن آمار رسمی آپتایم در MCTracker');
      if (!el.dataset.linkBound) {
        var openTracker = function () { window.open(PAGE_URL, '_blank', 'noopener,noreferrer'); };
        el.addEventListener('click', openTracker);
        el.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openTracker(); }
        });
        el.dataset.linkBound = '1';
      }
      return;
    }
    el.textContent = value.toLocaleString('fa-IR', { maximumFractionDigits: 1 }) + '٪';
    el.setAttribute('title', 'آپتایم ۳۰ روزه، دریافت‌شده از صفحه رسمی MCTracker');
    el.setAttribute('data-uptime-source', source || 'MCTracker');
  }

  function parseUptime(text) {
    if (!text) return null;
    var normalized = text.replace(/\u200c/g, '').replace(/,/g, '.');
    var patterns = [
      /([0-9]+(?:\.[0-9]+)?)\s*[%٪]?\s*(?:آپ.?تایم|uptime)/i,
      /(?:آپ.?تایم|uptime)[^\n\r]{0,70}?([0-9]+(?:\.[0-9]+)?)\s*[%٪]/i
    ];
    for (var i = 0; i < patterns.length; i++) {
      var match = normalized.match(patterns[i]);
      if (match) {
        var value = Number(match[1]);
        if (Number.isFinite(value) && value >= 0 && value <= 100) return value;
      }
    }
    return null;
  }

  function loadUptime() {
    var el = document.querySelector('[data-uptime]');
    if (!el) return;
    fetch(PAGE_READER_URL, { cache: 'no-store' })
      .then(function (response) { if (!response.ok) throw new Error('Reader unavailable'); return response.text(); })
      .then(function (text) {
        var value = parseUptime(text);
        if (value === null) throw new Error('Uptime not found');
        setUptime(value, 'MCTracker server page');
      })
      .catch(function () {
        /* Fallback to the documented API if it happens to include an uptime field. */
        fetch(API_URL, { cache: 'no-store' })
          .then(function (response) { if (!response.ok) throw new Error('API unavailable'); return response.json(); })
          .then(function (data) {
            var keys = ['uptime_30d', 'uptime30d', 'uptime_30_days', 'uptime30Days', 'uptime_percentage', 'uptime_percent', 'uptime'];
            var value = null;
            keys.some(function (key) {
              var raw = data && data[key];
              if (typeof raw === 'string') raw = Number(raw.replace('%', '').trim());
              if (typeof raw === 'number' && Number.isFinite(raw) && raw >= 0 && raw <= 100) { value = raw; return true; }
              return false;
            });
            setUptime(value, 'MCTracker API');
          })
          .catch(function () { setUptime(null); });
      });
  }

  function loadServerData() {
    var API_URL = 'https://mctracker.ir/api/server/715';
    fetch(API_URL, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error('MCTracker API unavailable');
      return response.json();
    }).then(function (data) {
      var players = document.getElementById('players');
      var maxPlayers = document.getElementById('maxPlayers');
      var version = document.getElementById('version');
      var versionInfo = document.getElementById('versionInfo');
      var lastUpdate = document.getElementById('lastUpdate');
      var status = document.getElementById('status');
      var statusText = document.getElementById('statusText');
      var badge = document.getElementById('statusBadge');
      var icon = document.getElementById('serverIcon');
      if (players && data.current_players != null) players.textContent = data.current_players;
      if (maxPlayers && data.max_players != null) maxPlayers.textContent = data.max_players;
      if (version && data.latest_version) version.textContent = data.latest_version;
      if (versionInfo && data.latest_version) versionInfo.textContent = data.latest_version;
      if (status && data.current_players != null) {
        status.textContent = 'دریافت‌شده از MCTracker';
        status.className = 'stat-value';
      }
      if (statusText && data.current_players != null) statusText.textContent = 'اطلاعات از MCTracker';
      if (badge) badge.classList.remove('offline');
      if (icon) icon.src = 'assets/images/favicon.png';
      if (lastUpdate) lastUpdate.textContent = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    }).catch(function () {
      var lastUpdate = document.getElementById('lastUpdate');
      if (lastUpdate) lastUpdate.textContent = 'برای آمار به MCTracker مراجعه کنید';
    });
  }

  function init() { loadUptime(); loadServerData(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
