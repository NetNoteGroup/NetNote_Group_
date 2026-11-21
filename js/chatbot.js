/* NetNote Assistant — a rule-based website chatbot (no server, no data leaves the browser).
   Knowledge comes from js/site-data.js. Unknown questions are handed to WhatsApp / the contact form. */
(function () {
  const S = window.NN_SITE; if (!S) return;
  const me = document.currentScript;
  const base = (me && me.getAttribute('src') || 'js/chatbot.js').replace('js/chatbot.js', '');
  const WA = 'https://wa.me/254798232855';
  const $ = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const go = (path) => (window.NNGO ? window.NNGO(path) : (location.href = base + path));

  const L = {
    services: ['All services', 'services.html'], systems: ['NetNote Systems', 'systems.html'], aero: ['NetNote Aero', 'aero.html'], security: ['NetNote Security', 'security.html'],
    quote: ['Request a quote', 'quote.html'], rates: ['View our rates', 'rates.html'], contact: ['Contact us', 'contact.html'], about: ['About NetNote Group', 'about.html'], exp: ['Our 7+ years of experience', 'experience.html'],
    portfolio: ['See our portfolio', 'portfolio.html'], clients: ['Companies we have worked with', 'clients.html'], insights: ['Blogs & vlogs', 'blog.html'], faq: ['FAQ', 'faq.html'], approach: ['How we work', 'approach.html'], industries: ['Industries we serve', 'industries.html']
  };
  const link = k => ({ t: L[k][0], p: L[k][1] });
  const svcLinks = co => S.services.filter(s => s.co === co).map(s => ({ t: s.title, p: 'services/' + s.slug + '.html' }));

  const intents = [
    { k: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'habari', 'jambo'], a: 'Hello! I am the NetNote Assistant. I can point you to the right service, explain what each NetNote company does, or help you request a quote. What do you need?', chips: true },
    { k: ['thank', 'thanks', 'asante'], a: 'You are welcome! Anything else I can help with?', chips: true },
    { k: ['bye', 'goodbye', 'see you'], a: 'Goodbye! Message us any time at netnotechronicles@gmail.com or on WhatsApp.' },
    { k: ['who are you', 'what is netnote', 'about netnote', 'about you', 'about us', 'group', 'company'], a: 'NetNote Group is a Nairobi-based group of three companies: NetNote Systems (IT, software, networks), NetNote Aero (drone and aerial services) and NetNote Security (cyber, data and physical security). We bring 7+ years of experience to every project.', l: ['about', 'systems', 'aero', 'security'] },
    { k: ['experience', 'years', 'how long', 'since when', 'established'], a: 'We bring 7+ years of hands-on experience across IT support, software, networks, security and aerial technology.', l: ['exp', 'portfolio', 'clients'] },
    { k: ['portfolio', 'projects', 'work you', 'case stud', 'examples'], a: 'Here are the kinds of projects we deliver across the three companies.', l: ['portfolio', 'clients'] },
    { k: ['client', 'worked for', 'worked with', 'customers', 'trusted by'], a: 'We have worked with a range of companies over the years. You can see them here.', l: ['clients', 'portfolio'] },
    { k: ['industry', 'industries', 'sector', 'school', 'hospital', 'retail', 'farm', 'sacco', 'bank', 'hotel', 'ngo'], a: 'We support many sectors, including education, retail, real estate, construction, agriculture, finance, health, logistics, hospitality and NGOs.', l: ['industries'] },
    { k: ['price', 'cost', 'how much', 'quote', 'quotation', 'estimate', 'budget', 'charge', 'rates'], a: 'Our standard charges are on our rate card. For a project price, the quick quote form takes about two minutes.', l: ['rates', 'quote', 'contact'] },
    { k: ['contact', 'phone', 'call', 'email', 'whatsapp', 'reach', 'number', 'talk to'], a: 'You can reach us on +254 798 232 855 (calls and WhatsApp) or netnotechronicles@gmail.com. Our office is Office No. 11, 1st Floor, Kahawa Sukari, Nairobi, Kenya.', l: ['contact', 'quote'], wa: true },
    { k: ['where', 'location', 'address', 'office', 'visit', 'nairobi', 'kahawa'], a: 'Our office is at Office No. 11, 1st Floor, Kahawa Sukari, Nairobi, Kenya (Zip 00606-3284).', l: ['contact'] },
    { k: ['blog', 'vlog', 'video', 'news', 'tech update', 'article', 'insight'], a: 'We share tech updates, guides and videos on our Insights page.', l: ['insights'] },
    { k: ['faq', 'question', 'how do you work', 'process', 'approach', 'steps'], a: 'We follow four steps: discuss, plan, deliver and support. More detail is on our approach page.', l: ['approach', 'faq'] },
    { k: ['job', 'career', 'vacancy', 'intern', 'hiring', 'work for you'], a: 'We are always glad to hear from talented people. Send your CV and a short note through the contact page.', l: ['contact'] },
    { k: ['systems', 'it support', 'it service'], a: 'NetNote Systems covers managed IT, web design, software and ERP, networks, and cloud and backup.', l: ['systems'], co: 'systems' },
    { k: ['aero', 'aerial', 'drone', 'fly', 'flying'], a: 'NetNote Aero offers aerial survey and mapping, drone photography and video, inspections and drone training.', l: ['aero'], co: 'aero' },
    { k: ['security', 'secure', 'protect', 'safety'], a: 'NetNote Security covers cyber security, data protection and recovery, CCTV and access control, and security audits.', l: ['security'], co: 'security' },
    { k: ['service', 'services', 'offer', 'what do you do', 'help with'], a: 'We offer 13 services across three companies. Pick a company to see its services, or browse them all.', l: ['services', 'systems', 'aero', 'security'] }
  ];
  const norm = s => ' ' + s.toLowerCase().replace(/[^a-z0-9& ]/g, ' ').replace(/\s+/g, ' ') + ' ';

  function priceReply(q) {
    if (!/ price| cost| how much| rate| rates| charge| fee| fees| quote /.test(q)) return null;
    const items = (window.NNRates ? NNRates.items() : []), words = q.split(' ').filter(w => w.length > 3 && !['price', 'cost', 'much', 'rate', 'rates', 'charge', 'fees', 'quote', 'what', 'your', 'does', 'about', 'with'].includes(w));
    let top = [], bs = 0; items.forEach(i => { const t = norm(i.title + ' ' + i.category); const sc = words.reduce((n, w) => n + (t.includes(' ' + w) ? 1 : 0), 0); if (sc > bs) { bs = sc; top = [i]; } else if (sc === bs && sc > 0) top.push(i); });
    if (!top.length) return { a: 'Our rates start from KSh 1,000 for computer repair, KSh 5,000 for Wi-Fi setup, KSh 15,000 for a landing page and KSh 35,000 for a 4-camera CCTV package. Larger or custom jobs are quoted after we understand your needs.', links: [link('rates'), link('quote')] };
    const line = i => i.title + ': ' + (NNRates.priceText(i) || 'price on request');
    if (top.length > 1) return { a: top.slice(0, 5).map(line).join('. ') + '. Your final quote depends on the site, equipment and scope.', links: [link('rates'), link('quote')] };
    const best = top[0], p = NNRates.priceText(best);
    return { a: best.title + ': ' + (p ? p + '.' : 'price on request.') + ' ' + best.desc + ' Your final quote depends on the site, equipment and scope.', links: [{ t: 'Request a quote for this', p: 'quote.html?item=' + encodeURIComponent(best.title) }, link('rates')] };
  }
  function reply(text) {
    const q = norm(text);
    const pr = priceReply(q); if (pr) return pr;
    // 1) a specific service?
    let best = null, bs = 0;
    S.services.forEach(s => { const sc = s.kw.reduce((n, w) => n + (q.includes(' ' + w) ? 1 : 0), 0); if (sc > bs) { bs = sc; best = s; } });
    if (best) return { a: `${best.title}: ${best.tag} Here is the full page, or I can set up a quote.`, links: [{ t: best.title, p: 'services/' + best.slug + '.html' }, link('quote')] };
    // 2) general intents (longest keyword wins)
    let hit = null, hl = 0;
    intents.forEach(it => it.k.forEach(w => { if (q.includes(' ' + w) && w.length > hl) { hit = it; hl = w.length; } }));
    if (hit) { const links = [...(hit.co ? svcLinks(hit.co) : []), ...(hit.l || []).map(link)]; return { a: hit.a, links, chips: hit.chips, wa: hit.wa }; }
    return { a: 'I am not sure I understood that. I can help with our services, quotes and contact details, or you can talk to a person directly.', links: [link('services'), link('quote')], wa: true, text };
  }

  // UI
  const btn = $('button', 'nn-chat-btn'); btn.type = 'button'; btn.setAttribute('aria-label', 'Chat with NetNote Assistant');
  const av = $('span', 'av'); const im = $('img'); im.src = base + 'assets/emblem-group.png'; im.alt = ''; av.appendChild(im);
  btn.append(av, $('span', 't', 'Chat with us'), $('span', 'badge'));
  const box = $('div', 'nn-chat'); box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'NetNote Assistant');
  const head = $('div', 'nn-head'); const av2 = $('span', 'av'); const im2 = $('img'); im2.src = base + 'assets/emblem-group.png'; im2.alt = ''; av2.appendChild(im2);
  const tt = $('div'); tt.append($('b', '', 'NetNote Assistant'), $('small', '', 'Automated assistant · Online'));
  const x = $('button', '', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close chat'); head.append(av2, tt, x);
  const msgs = $('div', 'nn-msgs'); msgs.setAttribute('aria-live', 'polite');
  const chips = $('div', 'nn-chips');
  const form = $('form', 'nn-form'); const inp = $('input'); inp.placeholder = 'Type your question…'; inp.setAttribute('aria-label', 'Your message'); const send = $('button', '', 'Send'); send.type = 'submit'; form.append(inp, send);
  box.append(head, msgs, chips, form, $('div', 'nn-note', 'Automated replies. For anything specific, message our team.'));
  document.body.append(btn, box);

  function addChips(list) {
    chips.innerHTML = '';
    list.forEach(c => { const b = $('button', '', c); b.type = 'button'; b.addEventListener('click', () => ask(c)); chips.appendChild(b); });
  }
  const quick = ['Our services', 'Get a quote', 'About NetNote', 'Contact'];
  function bubble(kind, text, links, wa, orig) {
    const m = $('div', 'nn-m ' + kind, text);
    if (links && links.length) {
      const w = $('div', 'nn-links');
      links.slice(0, 5).forEach(l => { const a = $('a', '', l.t + ' →'); a.href = base + l.p; a.addEventListener('click', e => { if (window.NNGO) { e.preventDefault(); go(l.p); } }); w.appendChild(a); });
      m.appendChild(w);
    }
    if (wa) { const w = m.querySelector('.nn-links') || m.appendChild($('div', 'nn-links')); const a = $('a', '', 'Chat with a person on WhatsApp →'); a.href = WA + (orig ? '?text=' + encodeURIComponent('Hello NetNote, ' + orig) : ''); a.target = '_blank'; a.rel = 'noopener'; w.appendChild(a); }
    msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight; return m;
  }
  function ask(text) {
    text = text.trim(); if (!text) return;
    bubble('me', text); inp.value = ''; chips.innerHTML = '';
    const t = $('div', 'nn-m bot nn-typing'); t.append($('i'), $('i'), $('i')); msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;
    const r = reply(text);
    setTimeout(() => { t.remove(); bubble('bot', r.a, r.links, r.wa, r.text); addChips(quick); }, 550 + Math.min(r.a.length * 6, 700));
  }
  form.addEventListener('submit', e => { e.preventDefault(); ask(inp.value); });
  let started = false;
  function open() {
    box.classList.add('open'); btn.style.display = 'none';
    if (!started) { started = true; bubble('bot', 'Hi, I am the NetNote Assistant. Reliable systems. Secure spaces. Smart solutions. Ask me about our services, our 7+ years of experience, or how to get a quote.'); addChips(quick); }
    inp.focus();
  }
  function close() { box.classList.remove('open'); btn.style.display = ''; }
  btn.addEventListener('click', open); x.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
