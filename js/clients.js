/* Renders clients into the home marquee (#client-track) and the Clients page grid (#client-grid).
   Source: js/clients-data.js, or the Google Sheet "Clients" tab (columns: name, logo_url) when configured. */
(function () {
  const cfg = window.NN_CONFIG || {};
  const base = (document.currentScript && document.currentScript.getAttribute('src') || '').replace('js/clients.js', '');
  function tile(c, big) {
    const d = document.createElement('div'); d.className = 'client' + (c.logo ? '' : ' ph') + (big ? ' big' : '');
    if (c.logo) { const i = document.createElement('img'); i.src = /^https?:/.test(c.logo) ? c.logo : base + c.logo; i.alt = c.name; i.loading = 'lazy'; d.appendChild(i); }
    else d.textContent = c.name + ' · logo coming soon';
    return d;
  }
  function draw(list) {
    const track = document.getElementById('client-track'), grid = document.getElementById('client-grid');
    if (track) { track.innerHTML = ''; [...list, ...list].forEach(c => track.appendChild(tile(c, false))); }
    if (grid) { grid.innerHTML = ''; list.forEach(c => grid.appendChild(tile(c, true))); }
  }
  draw(window.NN_CLIENTS || []);
  if (cfg.sheets && cfg.sheets.clients && window.NN && NN.fetchSheet) NN.fetchSheet(cfg.sheets.clients).then(rows => { const l = rows.filter(r => r.name).map(r => ({ name: r.name, logo: NN.img(r.logo_url) })); if (l.length) draw(l); }).catch(() => {});
})();
