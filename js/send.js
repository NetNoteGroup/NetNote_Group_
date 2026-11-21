/* Shared helpers: sending messages (Gmail / email app / WhatsApp / copy / optional direct form), Google Sheet CSV loading. */
(function () {
  const cfg = window.NN_CONFIG || {};
  const NN = (window.NN = window.NN || {});
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };

  NN.csv = function (text) {
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return [];
    const head = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
    return rows.slice(1).filter(r => r.some(x => x.trim())).map(r => { const o = {}; head.forEach((h, i) => o[h] = (r[i] || '').trim()); return o; });
  };
  NN.fetchSheet = async function (url) {
    if (!url) return [];
    const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error('sheet');
    return NN.csv(await r.text());
  };
  // Turns Google Drive share links into directly displayable image links.
  NN.img = function (u) {
    u = (u || '').trim(); if (!u) return '';
    const m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/[?&]id=([\w-]+)/);
    if (m && /drive\.google\.com/.test(u)) return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1600';
    return u;
  };

  // Send panel: shows every reliable way to deliver the message.
  NN.sendPanel = function (host, subject, body) {
    host.innerHTML = '';
    const box = el('div', 'summary'); box.setAttribute('role', 'status');
    box.append(el('b', '', 'Your message is ready. Choose how to send it:'));
    const row = el('div', 'btn-row');
    if (cfg.formEndpoint) {
      const b = el('button', 'btn', 'Send now'); b.type = 'button';
      b.addEventListener('click', async () => {
        b.disabled = true; b.textContent = 'Sending…';
        try { const r = await fetch(cfg.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ subject, message: body }) }); if (!r.ok) throw 0; b.textContent = 'Sent ✓'; NN.toast('Thank you! We will reply soon.'); }
        catch (e) { b.disabled = false; b.textContent = 'Send now'; NN.toast('Could not send. Try email or WhatsApp.'); }
      });
      row.appendChild(b);
    }
    const g = el('a', 'btn', 'Open in Gmail'); g.target = '_blank'; g.rel = 'noopener';
    g.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(cfg.email) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const m = el('a', 'btn ghost', 'Open email app'); m.target = '_blank'; m.rel = 'noopener';
    m.href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const w = el('a', 'btn ghost', 'Send on WhatsApp'); w.target = '_blank'; w.rel = 'noopener';
    w.href = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(body);
    const c = el('button', 'btn ghost', 'Copy message'); c.type = 'button';
    c.addEventListener('click', () => {
      const done = () => NN.toast('Copied. Paste it into any email or chat to ' + cfg.email);
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(body).then(done, fallback); else fallback();
      function fallback() { const t = el('textarea'); t.value = body; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) { NN.toast('Please copy the message manually'); } t.remove(); }
    });
    row.append(g, m, w, c); box.appendChild(row);
    const note = el('p', 'meta', 'Prefer to write directly? Email ' + cfg.email + ' or WhatsApp ' + cfg.phone + '.'); note.style.margin = '12px 0 0';
    box.appendChild(note); host.appendChild(box); host.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
})();
