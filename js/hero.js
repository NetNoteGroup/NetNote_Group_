/* Home hero: interactive group constellation. Hover/focus/tap a company to read about it. */
(function () {
  const nodes = document.querySelectorAll('.node');
  const info = document.querySelector('.node-info');
  if (!nodes.length || !info) return;
  const data = {
    systems: { name: 'NetNote Systems', color: '#1E75FF', text: 'Managed IT, software, ERP, networks and cloud for growing businesses.', href: 'systems.html' },
    aero: { name: 'NetNote Aero', color: '#0E9FCB', text: 'Drone mapping, aerial imaging and inspections that see what the ground hides.', href: 'aero.html' },
    security: { name: 'NetNote Security', color: '#D9811F', text: 'Cyber security, data protection and physical security for people and systems.', href: 'security.html' }
  };
  function show(key) {
    const d = data[key];
    info.style.borderTopColor = d.color;
    info.innerHTML = '';
    const s = document.createElement('strong'); s.textContent = d.name;
    const p = document.createElement('span'); p.textContent = d.text + ' ';
    const a = document.createElement('a'); a.href = d.href; a.textContent = 'Visit company';
    info.append(s, p, a);
    nodes.forEach(n => n.classList.toggle('on', n.dataset.key === key));
  }
  nodes.forEach(n => {
    ['mouseenter', 'focus', 'click'].forEach(ev => n.addEventListener(ev, () => show(n.dataset.key)));
    n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); location.href = data[n.dataset.key].href; } });
    n.addEventListener('dblclick', () => location.href = data[n.dataset.key].href);
  });
  // gentle auto-cycle until the visitor interacts
  let i = 0, auto = true; const keys = Object.keys(data);
  show(keys[0]);
  const timer = setInterval(() => { if (!auto) return clearInterval(timer); i = (i + 1) % keys.length; show(keys[i]); }, 3500);
  nodes.forEach(n => n.addEventListener('mouseenter', () => auto = false));
  nodes.forEach(n => n.addEventListener('focus', () => auto = false));
})();
