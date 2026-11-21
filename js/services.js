/* Services hub: filter by company and search. */
(function () {
  const cards = [...document.querySelectorAll('#service-grid .card')]; if (!cards.length) return;
  const search = document.getElementById('service-search'), empty = document.getElementById('no-services');
  let co = 'all';
  function apply() {
    const q = search.value.trim().toLowerCase(); let n = 0;
    cards.forEach(c => {
      const show = (co === 'all' || c.dataset.company === co) && (!q || c.textContent.toLowerCase().includes(q));
      c.classList.toggle('hidden', !show); if (show) n++;
    });
    empty.classList.toggle('hidden', n > 0);
  }
  document.querySelectorAll('#company-filter .tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('#company-filter .tab').forEach(x => x.classList.toggle('on', x === t)); co = t.dataset.v; apply();
  }));
  search.addEventListener('input', apply);
  const pre = new URLSearchParams(location.search).get('company');
  if (pre) { const t = document.querySelector(`#company-filter [data-v="${pre}"]`); if (t) t.click(); }
})();
