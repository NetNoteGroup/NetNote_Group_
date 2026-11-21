/* Photo galleries: lightbox for every gallery + extra photos from the Google Sheet "Gallery" tab (columns: page, image_url, caption). */
(function () {
  const cfg = window.NN_CONFIG || {};
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  function lightbox(src, cap) {
    let m = document.getElementById('lightbox');
    if (!m) { m = el('div', 'modal'); m.id = 'lightbox'; document.body.appendChild(m); m.addEventListener('click', () => m.classList.remove('open')); document.addEventListener('keydown', e => { if (e.key === 'Escape') m.classList.remove('open'); }); }
    m.innerHTML = ''; const b = el('div', 'modal-box'); b.style.background = '#06122B'; const i = el('img'); i.src = src; i.alt = cap || ''; i.style.cssText = 'width:100%;max-height:80vh;object-fit:contain';
    b.appendChild(i); if (cap) { const p = el('p', '', cap); p.style.cssText = 'color:#fff;padding:12px 18px;margin:0'; b.appendChild(p); } m.appendChild(b); m.classList.add('open');
  }
  function bind(fig) { fig.addEventListener('click', () => { const i = fig.querySelector('img'); lightbox(i.src, i.alt); }); fig.tabIndex = 0; fig.addEventListener('keydown', e => { if (e.key === 'Enter') fig.click(); }); }
  function fig(src, cap) { const f = el('figure'); const i = el('img'); i.src = src; i.alt = cap || 'NetNote Group project photo'; i.loading = 'lazy'; f.appendChild(i); if (cap) f.appendChild(el('figcaption', '', cap)); bind(f); return f; }
  const galleries = [...document.querySelectorAll('.gallery')];
  galleries.forEach(g => { g.querySelectorAll('figure').forEach(bind); const s = g.closest('.gal-sec'); if (s && !g.children.length) s.classList.add('hidden'); });
  if (!galleries.length || !cfg.sheets || !cfg.sheets.gallery) return;
  NN.fetchSheet(cfg.sheets.gallery).then(rows => {
    rows.forEach(r => {
      const url = NN.img(r.image_url); if (!url) return;
      galleries.forEach(g => { const p = (r.page || '').toLowerCase(); if (p === g.dataset.page || p === 'all') { g.appendChild(fig(url, r.caption)); const s = g.closest('.gal-sec'); if (s) s.classList.remove('hidden'); } });
    });
  }).catch(() => {});
})();
