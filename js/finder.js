/* "Find your solution" — answer one question, get matched to a company and services. */
(function () {
  const wrap = document.getElementById('finder'); if (!wrap) return;
  const out = document.getElementById('finder-result');
  const opts = [
    { q: 'My IT keeps breaking or needs looking after', co: 'NetNote Systems', color: '#1E75FF', page: 'systems.html', pts: [['Managed IT & Support', 'services/managed-it.html'], ['Network Design & Deployment', 'services/network-design.html'], ['Cloud & Backup Solutions', 'services/cloud-backup.html']] },
    { q: 'I need a website, app or ERP system', co: 'NetNote Systems', color: '#1E75FF', page: 'systems.html', pts: [['Web Design & Development', 'services/web-design.html'], ['Software & ERP Services', 'services/software-erp.html']] },
    { q: 'I want to protect my data or stop cyber attacks', co: 'NetNote Security', color: '#D9811F', page: 'security.html', pts: [['Cyber Security Services', 'services/cyber-security.html'], ['Data Protection & Recovery', 'services/data-protection.html'], ['Security Audits & Compliance', 'services/security-audit.html']] },
    { q: 'I need cameras or access control for my premises', co: 'NetNote Security', color: '#D9811F', page: 'security.html', pts: [['Surveillance & Access Control', 'services/surveillance-access.html'], ['Security Audits & Compliance', 'services/security-audit.html']] },
    { q: 'I need a land survey, drone footage or an inspection', co: 'NetNote Aero', color: '#0E9FCB', page: 'aero.html', pts: [['Aerial Survey & Mapping', 'services/aerial-survey.html'], ['Drone Photography & Video', 'services/drone-media.html'], ['Drone Inspection Services', 'services/drone-inspection.html']] },
    { q: 'I want to learn to fly drones', co: 'NetNote Aero', color: '#0E9FCB', page: 'aero.html', pts: [['Drone Training & Consulting', 'services/drone-training.html']] }
  ];
  const btns = document.getElementById('finder-choices');
  opts.forEach((o, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'choice'; b.textContent = o.q;
    b.addEventListener('click', () => {
      btns.querySelectorAll('.choice').forEach(x => x.classList.toggle('on', x === b));
      out.innerHTML = ''; out.style.borderTopColor = o.color;
      const h = document.createElement('h3'); h.textContent = 'We recommend ' + o.co; out.appendChild(h);
      const p = document.createElement('p'); p.textContent = 'These services fit what you described:'; out.appendChild(p);
      const ul = document.createElement('ul'); o.pts.forEach(([t, u]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = u; a.textContent = t; li.appendChild(a); ul.appendChild(li); }); out.appendChild(ul);
      const a = document.createElement('a'); a.className = 'btn small'; a.href = 'quote.html'; a.textContent = 'Get a quote'; const a2 = document.createElement('a'); a2.className = 'btn ghost small'; a2.href = o.page; a2.textContent = 'About ' + o.co; a2.style.marginLeft = '8px';
      out.append(a, a2);
    });
    btns.appendChild(b);
  });
})();
