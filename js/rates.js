/* Rates: full page (#rates-root), compact lists on service pages (.rate-mini[data-svc]) and home (.rate-mini[data-items]).
   Data: js/rates-data.js, replaced by the Google Sheet "Rates" tab when configured. */
(function () {
  const cfg = window.NN_CONFIG || {};
  const base = (document.currentScript.getAttribute('src') || '').replace('js/rates.js', '');
  let R = JSON.parse(JSON.stringify(window.NN_RATES || { categories: [] }));
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const price = i => i.price ? (i.unit === 'exact' ? '' : 'From ') + 'KSh ' + Number(i.price).toLocaleString('en-US') + (i.unit && i.unit !== 'exact' ? i.unit : '') : '';
  const flat = () => R.categories.flatMap(c => c.items.map(i => ({ ...i, category: c.name })));
  window.NNRates = { items: flat, priceText: price };
  function card(i) {
    const c = el('div', 'card rate'); c.appendChild(el('h3', '', i.title)); c.appendChild(el('p', '', i.desc));
    const p = price(i); c.appendChild(el('div', 'price' + (p ? '' : ' q'), p || 'Price on request'));
    const row = el('div', 'btn-row'); row.style.marginTop = '0';
    const q = el('a', 'btn small', 'Request quote'); q.href = base + 'quote.html?item=' + encodeURIComponent(i.title);
    const w = el('a', 'btn ghost small', 'WhatsApp'); w.target = '_blank'; w.rel = 'noopener noreferrer';
    w.href = 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent('Hello NetNote Group, I would like a quote for: ' + i.title + (p ? ' (' + p + ')' : ''));
    row.append(q, w); c.appendChild(row); return c;
  }
  function render() {
    const root = document.getElementById('rates-root');
    if (root) {
      root.innerHTML = ''; const tabs = el('div', 'tabs'); const body = el('div'); root.append(tabs, body);
      const show = n => { tabs.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.textContent === n)); body.innerHTML = ''; const g = el('div', 'grid g3'); R.categories.find(c => c.name === n).items.forEach(i => g.appendChild(card(i))); body.appendChild(g); };
      R.categories.forEach((c, k) => { const t = el('button', 'tab' + (k ? '' : ' on'), c.name); t.type = 'button'; t.addEventListener('click', () => show(c.name)); tabs.appendChild(t); });
      if (R.categories.length) show(R.categories[0].name);
      const n = el('p', 'note', R.note || ''); n.style.marginTop = '24px'; if (R.note) root.appendChild(n);
    }
    document.querySelectorAll('.rate-mini').forEach(m => {
      m.innerHTML = ''; const sec = m.closest('.rate-sec');
      const items = m.dataset.svc ? flat().filter(i => i.svc === m.dataset.svc) : (m.dataset.items || '').split('|').map(t => flat().find(i => i.title === t)).filter(Boolean);
      const g = el('div', 'grid g3'); items.slice(0, 6).forEach(i => g.appendChild(card(i))); m.appendChild(g);
      const more = el('div', 'btn-row'); const a = el('a', 'btn ghost', 'See all rates'); a.href = base + 'rates.html'; more.appendChild(a); m.appendChild(more);
      if (sec) sec.classList.toggle('hidden', !items.length);
    });
  }
  render();
  if (cfg.sheets && cfg.sheets.rates && window.NN && NN.fetchSheet) NN.fetchSheet(cfg.sheets.rates).then(rows => {
    const cats = {}; rows.filter(r => r.title).forEach(r => { (cats[r.category || 'Rates'] = cats[r.category || 'Rates'] || []).push({ title: r.title, desc: r.description || '', price: parseFloat(String(r.price).replace(/[^\d.]/g, '')) || 0, unit: r.unit || '', svc: r.service || '' }); });
    const names = Object.keys(cats); if (names.length) { R = { note: R.note, categories: names.map(n => ({ name: n, items: cats[n] })) }; window.NNRates.items = flat; render(); }
  }).catch(() => {});
})();
