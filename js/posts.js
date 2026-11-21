/* Shared post store + renderer (used by index.html and blog.html). */
(function () {
  const KEY = 'nn_posts_local';
  const LABEL = { systems: 'Systems', aero: 'Aero', security: 'Security', general: 'Tech Updates' };
  const cfg = window.NN_CONFIG || {};
  let cache = (window.NN_POSTS || []).slice();
  function isoDate(s) {
    s = (s || '').trim(); const today = new Date().toISOString().slice(0, 10); if (!s) return today;
    let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) return m[1] + '-' + m[2].padStart(2, '0') + '-' + m[3].padStart(2, '0');
    m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/);
    if (m) { let d = +m[1], mo = +m[2]; if (mo > 12) { const t = d; d = mo; mo = t; } return m[3] + '-' + String(mo).padStart(2, '0') + '-' + String(d).padStart(2, '0'); }
    const t = new Date(s); return isNaN(t) ? today : t.toISOString().slice(0, 10);
  }
  function fromRow(r, i) {
    const cat = (r.category || r.topic || '').toLowerCase(), cats = ['systems', 'aero', 'security'];
    const type = /vlog|video/i.test(r.type || '') || (r.video_url || r.video) ? 'vlog' : 'blog';
    return { id: 'sheet-' + i + '-' + (r.title || '').slice(0, 12), type, category: cats.includes(cat) ? cat : 'general', date: isoDate(r.date), author: r.author || 'NetNote Group', title: r.title, summary: r.summary || (r.body || '').replace(/\s+/g, ' ').slice(0, 130) + '…', body: (r.body || '').replace(/\s*\|\|\s*/g, '\n\n'), video: r.video_url || r.video || '', image: NN.img(r.image_url || r.image) };
  }
  const ready = (async () => {
    if (!cfg.sheets || !cfg.sheets.posts || !window.NN || !NN.fetchSheet) return;
    try { const rows = await NN.fetchSheet(cfg.sheets.posts); rows.filter(r => r.title && !/^(no|n|false|draft|hide)$/i.test(r.published || r.publish || '')).forEach((r, i) => cache.push(fromRow(r, i))); } catch (e) { /* offline or not configured: built-in posts only */ }
  })();
  const store = {
    all() { const seen = new Set(), out = []; cache.forEach(p => { if (!seen.has(p.id)) { seen.add(p.id); out.push(p); } }); return out.sort((a, b) => (b.date || '').localeCompare(a.date || '')); }
  };
  function youtubeId(url) {
    const m = String(url || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function fmtDate(d) { const t = new Date(d); return isNaN(t) ? '' : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function card(p, onOpen) {
    const b = el('button', 'card post-card ' + (p.category === 'general' ? '' : p.category));
    b.type = 'button';
    const th = el('div', 'thumb ' + p.category);
    if (p.image) { th.style.background = 'center/cover url("' + p.image + '")'; } if (p.type === 'vlog') th.appendChild(el('span', 'play')); else if (!p.image) th.textContent = LABEL[p.category] || 'Tech Updates';
    const body = el('div', 'post-body');
    const tag = el('span', 'tag ' + p.category, (p.type === 'vlog' ? 'Vlog · ' : 'Blog · ') + (LABEL[p.category] || 'Tech Updates'));
    body.append(tag, el('h3', '', p.title), el('p', '', p.summary || ''), el('div', 'meta', [p.author, fmtDate(p.date)].filter(Boolean).join(' · ')));
    b.append(th, body);
    b.addEventListener('click', () => onOpen(p));
    return b;
  }

  function openModal(p) {
    let m = document.getElementById('post-modal');
    if (!m) {
      m = el('div', 'modal'); m.id = 'post-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
      document.body.appendChild(m);
      m.addEventListener('click', e => { if (e.target === m) closeModal(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }
    m.innerHTML = '';
    const box = el('div', 'modal-box');
    const x = el('button', 'close', '×'); x.setAttribute('aria-label', 'Close'); x.addEventListener('click', closeModal);
    box.appendChild(x);
    if (p.type !== 'vlog' && p.image) { const im = el('img'); im.src = p.image; im.alt = p.title; im.style.cssText = 'width:100%;max-height:340px;object-fit:cover'; box.appendChild(im); }
    if (p.type === 'vlog') {
      const id = youtubeId(p.video), v = el('div', 'video');
      if (id) { const f = document.createElement('iframe'); f.src = 'https://www.youtube-nocookie.com/embed/' + id; f.title = p.title; f.allowFullscreen = true; f.allow = 'accelerometer; encrypted-media; picture-in-picture'; v.appendChild(f); }
      else { v.style.display = 'grid'; v.style.placeItems = 'center'; v.style.color = '#fff'; v.textContent = 'Video coming soon'; }
      box.appendChild(v);
    }
    const body = el('div', 'modal-body');
    body.append(el('span', 'tag ' + p.category, LABEL[p.category] || 'Tech Updates'), el('h2', '', p.title), el('p', 'meta', [p.author, fmtDate(p.date)].filter(Boolean).join(' · ')));
    String(p.body || '').split(/\n\s*\n/).forEach(par => body.appendChild(el('p', '', par.trim())));
    box.appendChild(body); m.appendChild(box); m.classList.add('open'); document.body.style.overflow = 'hidden';
    x.focus();
  }
  function closeModal() { const m = document.getElementById('post-modal'); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } }

  window.NNPosts = { store, card, openModal, youtubeId, LABEL, ready };

  // Home page: latest three posts
  const latest = document.getElementById('latest-posts');
  if (latest) ready.then(() => { latest.innerHTML = ''; store.all().slice(0, 3).forEach(p => latest.appendChild(card(p, openModal))); });
  if (latest) store.all().slice(0, 3).forEach(p => latest.appendChild(card(p, openModal)));
})();
