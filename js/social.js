/* Icon buttons for call, WhatsApp, email and social links. Everything comes from js/config.js. */
(function () {
  const cfg = window.NN_CONFIG || {}, s = cfg.social || {};
  const P = {
    call: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/><path d="M9.3 8.6c.4 2.1 2.4 4.1 5.1 5l1-1.2-1.8-1-.8.6a4 4 0 0 1-1.7-1.7l.6-.8-1-1.8z"/>',
    email: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="m22 6-10 7L2 6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5.1 5.1 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5.1 5.1 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
    telegram: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    tiktok: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'
  };
  const svg = k => '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[k] + '</svg>';
  function a(k, label, href) { const e = document.createElement('a'); e.className = 'ico-btn'; e.href = href; e.target = '_blank'; e.rel = 'noopener noreferrer'; e.setAttribute('aria-label', label); e.title = label; e.innerHTML = svg(k); return e; }
  document.querySelectorAll('.call-line').forEach(h => {
    const e = document.createElement('a'); e.className = 'call'; e.href = 'tel:' + cfg.phone.replace(/\s/g, ''); e.setAttribute('aria-label', 'Call ' + cfg.phone);
    e.innerHTML = '<span class="ico-btn">' + svg('call') + '</span><span>' + cfg.phone + '</span>'; h.appendChild(e);
  });
  document.querySelectorAll('.social-icons').forEach(h => {
    h.appendChild(a('whatsapp', 'Chat on WhatsApp', 'https://wa.me/' + cfg.whatsapp));
    h.appendChild(a('email', 'Send us an email', 'mailto:' + cfg.email));
    [['linkedin', 'LinkedIn'], ['x', 'X (Twitter)'], ['github', 'GitHub'], ['telegram', 'Telegram'], ['tiktok', 'TikTok']].forEach(([k, l]) => { if (s[k]) h.appendChild(a(k, l, s[k])); });
  });
})();
