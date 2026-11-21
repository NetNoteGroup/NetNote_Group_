/* NetNote Group — shared behaviour: menu, dropdowns, counters, tabs, back-to-top, toast */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const burger = $('.burger'), menu = $('.menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
  }
  $$('.has-drop > button').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const li = btn.parentElement, open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', () => $$('.has-drop.open').forEach(l => l.classList.remove('open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.has-drop.open').forEach(l => l.classList.remove('open')); });

  // Animated counters
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1200;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }), { threshold: .5 });
    counters.forEach(c => io.observe(c));
  }

  // Generic tab groups: buttons [data-tab] control panels [data-panel]
  $$('[data-tabs]').forEach(group => {
    const tabs = $$('[data-tab]', group), panels = $$('[data-panel]', group);
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== tab.dataset.tab));
    }));
  });

  // Back to top
  const top = $('.totop');
  if (top) {
    window.addEventListener('scroll', () => top.classList.toggle('show', window.scrollY > 600), { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  window.NN = window.NN || {};
  NN.toast = function (msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3200);
  };
})();
