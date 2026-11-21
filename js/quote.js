/* Three-step quote wizard. Sends by email or WhatsApp (no server needed). */
(function () {
  const root = document.getElementById('quote'); if (!root) return;
  const S = window.NN_SITE, steps = [...root.querySelectorAll('.qstep')], bar = root.querySelector('.wizard-bar i');
  const chipBox = document.getElementById('q-services'), picked = new Set(), d = {};
  let i = 0;
  S.services.forEach(s => { const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = s.title; b.addEventListener('click', () => { picked.has(s.title) ? picked.delete(s.title) : picked.add(s.title); b.classList.toggle('on'); }); chipBox.appendChild(b); });
  const qp = new URLSearchParams(location.search), item = qp.get('item'), pre = qp.get('service');
  if (item) { const it = ((window.NN_RATES || {}).categories || []).flatMap(c => c.items).find(x => x.title === item); const sv = it && S.services.find(s => s.slug === it.svc); if (sv) setTimeout(() => chipBox.querySelectorAll('.chip').forEach(c => { if (c.textContent === sv.title && !picked.has(sv.title)) c.click(); }), 0); const d = document.getElementById('q-desc'); if (d) d.value = 'I would like a quote for: ' + item + '.'; }
  if (pre) chipBox.querySelectorAll('.chip').forEach(c => { if (c.textContent === pre) { c.click(); } });
  function show(n) { i = n; steps.forEach((s, k) => s.classList.toggle('hidden', k !== n)); bar.style.width = ((n + 1) / steps.length * 100) + '%'; root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  const err = (id, msg) => { const e = document.getElementById(id); e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none'; };
  root.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => {
    if (i === 0) { if (!picked.size) return err('qerr0', 'Pick at least one service.'); err('qerr0'); }
    if (i === 1) { if (!root.querySelector('#q-desc').value.trim()) return err('qerr1', 'Please describe your project briefly.'); err('qerr1'); }
    if (i === 1) { d.desc = root.querySelector('#q-desc').value.trim(); d.time = root.querySelector('#q-time').value; d.budget = root.querySelector('#q-budget').value; }
    show(i + 1);
  }));
  root.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => show(i - 1)));
  const msg = () => `Quote request\n\nServices: ${[...picked].join(', ')}\nTimeline: ${d.time}\nBudget: ${d.budget}\n\nProject: ${d.desc}\n\nName: ${root.querySelector('#q-name').value}\nEmail: ${root.querySelector('#q-email').value}\nPhone: ${root.querySelector('#q-phone').value || '-'}`;
  function valid() {
    const n = root.querySelector('#q-name').value.trim(), e = root.querySelector('#q-email').value.trim();
    if (n.length < 2) { err('qerr2', 'Please enter your name.'); return false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { err('qerr2', 'Please enter a valid email.'); return false; }
    err('qerr2'); return true;
  }
  const area = document.getElementById('send-area'), cfg = window.NN_CONFIG;
  document.getElementById('q-email-btn').addEventListener('click', () => { if (valid()) NN.sendPanel(area, 'Quote request', msg()); });
  document.getElementById('q-wa-btn').addEventListener('click', () => { if (!valid()) return; const w = window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(msg()), '_blank', 'noopener'); if (!w) NN.sendPanel(area, 'Quote request', msg()); });
  show(0);
})();
