/* NetNote Group Insights page: filter + search. Posts come from js/posts-data.js and the Google Sheet "Posts" tab. */
(function () {
  const { store, card, openModal, ready } = window.NNPosts;
  const list = document.getElementById('post-list'), empty = document.getElementById('no-posts'), search = document.getElementById('post-search');
  let type = 'all', cat = 'all';
  function render() {
    const q = search.value.trim().toLowerCase(); list.innerHTML = '';
    const items = store.all().filter(p => (type === 'all' || p.type === type) && (cat === 'all' || p.category === cat) && (!q || (p.title + ' ' + p.summary + ' ' + p.body).toLowerCase().includes(q)));
    items.forEach(p => list.appendChild(card(p, openModal)));
    empty.classList.toggle('hidden', items.length > 0);
  }
  function group(sel, apply) { document.querySelectorAll(sel + ' .tab').forEach(t => t.addEventListener('click', () => { document.querySelectorAll(sel + ' .tab').forEach(x => x.classList.toggle('on', x === t)); apply(t.dataset.v); render(); })); }
  group('#type-tabs', v => type = v); group('#cat-tabs', v => cat = v); search.addEventListener('input', render);
  render(); ready.then(render);
})();
