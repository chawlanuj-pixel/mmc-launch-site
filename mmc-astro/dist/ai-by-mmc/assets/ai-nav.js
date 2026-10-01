/* AI by MMC header: mobile sheet + desktop AI services dropdown. No dependencies. */
(function () {
  var d = document, html = d.documentElement;
  var burger = d.querySelector('.nav__burger'), sheet = d.getElementById('ai-sheet');
  var ddBtn = d.querySelector('.nav__ddbtn'), dd = d.getElementById('ai-dd');
  var page = location.pathname.split('/').pop() || 'index.html';
  d.querySelectorAll('.nav__ddpanel a, .sheet a, .foot a').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h && h.indexOf('/') !== 0 && h === page) a.setAttribute('aria-current', 'page');
  });
  function setSheet(open) {
    if (!sheet) return;
    sheet.hidden = !open; burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    html.classList.toggle('sheet-open', open);
    if (open) { var f = sheet.querySelector('a'); if (f) f.focus(); }
  }
  function setDd(open) { if (!dd) return; dd.hidden = !open; ddBtn.setAttribute('aria-expanded', open); }
  if (burger) burger.addEventListener('click', function () { setSheet(sheet.hidden); });
  if (sheet) sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setSheet(false); });
  if (ddBtn) ddBtn.addEventListener('click', function () { setDd(dd.hidden); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (sheet && !sheet.hidden) { setSheet(false); burger.focus(); }
    if (dd && !dd.hidden) { setDd(false); ddBtn.focus(); }
  });
  d.addEventListener('click', function (e) { if (dd && !dd.hidden && !e.target.closest('.nav__dd')) setDd(false); });
  if (dd) dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget) && e.relatedTarget !== ddBtn) setDd(false); });
  window.addEventListener('resize', function () { if (innerWidth >= 1024) setSheet(false); else setDd(false); });
})();
