/* DeathCraft - shared behaviour: theme, menu, copy IP, install prompt, service worker */
(function () {
  var root = document.documentElement;

  /* theme toggle (the initial theme is set by a tiny inline script in <head>) */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('dc-theme', next); } catch (e) {}
  });

  /* mobile menu */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  /* copy to clipboard */
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = 'آی‌پی کپی شد';
  document.body.appendChild(toast);

  function showToast() {
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-copy]');
    if (!el) return;
    var text = el.getAttribute('data-copy');
    var done = function () { showToast(); };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (err) {}
      t.remove();
    }
  });

  /* PWA install button (only shown when the browser allows it) */
  var installBtn = document.querySelector('[data-install]');
  var deferred;
  if (installBtn) installBtn.hidden = true;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) installBtn.addEventListener('click', function () { if (deferred) deferred.prompt(); });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }
})();
