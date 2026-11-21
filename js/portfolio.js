/* Portfolio grid: filter by company, open details. Also fills #home-projects on the home page. */
(function () {
  const P = window.NN_PROJECTS || [];
  const NAMES = { systems: 'NetNote Systems', aero: 'NetNote Aero', security: 'NetNote Security' };
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  function thumb(p) { const t = el('div', 'thumb ' + p.company + (p.img ? ' photo' : ''), p.img ? '' : NAMES[p.company]); if (p.img) t.style.backgroundImage = 'url("' + p.img + '")'; return t; }
  function card(p, open) {
    const b = el('button', 'card proj ' + p.company); b.type = 'button';
    const th = thumb(p);
    const body = el('div', 'post-body'); body.append(el('span', 'tag ' + p.company, p.tags[0]), el('h3', '', p.title), el('p', '', p.summary), el('span', 'more', 'View details →'));
    b.append(th, body); b.addEventListener('click', () => open(p)); return b;
  }
  function modal(p) {
    let m = document.getElementById('proj-modal');
    if (!m) { m = el('div', 'modal'); m.id = 'proj-modal'; document.body.appendChild(m); m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); }); document.addEventListener('keydown', e => { if (e.key === 'Escape') m.classList.remove('open'); }); }
    m.innerHTML = ''; const box = el('div', 'modal-box'); const x = el('button', 'close', '×'); x.addEventListener('click', () => m.classList.remove('open')); x.setAttribute('aria-label', 'Close');
    const th = thumb(p); if (p.img) th.style.height = '280px'; const body = el('div', 'modal-body');
    const ul = el('ul', 'checks'); p.scope.forEach(s => ul.appendChild(el('li', '', s)));
    const chips = el('div', 'chips'); p.tags.forEach(t => chips.appendChild(el('span', 'chip', t)));
    const q = el('a', 'btn', 'Discuss a similar project'); q.href = 'contact.html?company=' + encodeURIComponent(NAMES[p.company]);
    const r = el('div', 'btn-row'); r.appendChild(q);
    body.append(el('h2', '', p.title), el('p', 'lead', p.summary), el('h3', '', 'Scope of work'), ul, el('div', '', ''), chips, r);
    box.append(x, th, body); m.appendChild(box); m.classList.add('open');
  }
  const grid = document.getElementById('project-grid');
  if (grid) {
    let co = 'all';
    const draw = () => { grid.innerHTML = ''; P.filter(p => co === 'all' || p.company === co).forEach(p => grid.appendChild(card(p, modal))); };
    document.querySelectorAll('#project-filter .tab').forEach(t => t.addEventListener('click', () => { document.querySelectorAll('#project-filter .tab').forEach(x => x.classList.toggle('on', x === t)); co = t.dataset.v; draw(); }));
    draw();
  }
  const home = document.getElementById('home-projects');
  if (home) [P[0], P[4], P[8]].filter(Boolean).forEach(p => home.appendChild(card(p, modal)));
})();
