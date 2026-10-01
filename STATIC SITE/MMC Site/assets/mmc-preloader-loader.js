/*! MMC Preloader Loader: picks 1 of 8 variants/session, injects only that one. */
(function () {
  var VARIANTS = [
    'white-slam', 'white-dawn', 'white-compound', 'white-funnel', 'white-reach',
    'navy-funnel', 'navy-dial', 'navy-reach'
  ];
  var KEY = 'mmc-pre-pick';
  var qs = location.search;
  var mode = /[?&]preloader=(\w+)/.exec(qs);
  var pick = /[?&]preloader_pick=([\w-]+)/.exec(qs);
  if (mode && mode[1] === 'off') return;

  var name;
  if (pick && VARIANTS.indexOf(pick[1]) !== -1) {
    name = pick[1];
  } else {
    try { name = sessionStorage.getItem(KEY); } catch (e) { name = null; }
    if (!name || (mode && mode[1] === 'force')) {
      name = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    }
  }
  try { sessionStorage.setItem(KEY, name); } catch (e) { }

  var s = document.createElement('script');
  s.src = 'assets/preloaders/' + name + '.js';
  (document.head || document.documentElement).appendChild(s);
})();
