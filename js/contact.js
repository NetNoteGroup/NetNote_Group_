/* Contact page: validation, prefilled service, then a send panel (Gmail / email app / WhatsApp / copy). */
(function () {
  const formEl = document.getElementById('contact-form'); if (!formEl) return;
  const form = formEl.elements, cfg = window.NN_CONFIG, area = document.getElementById('send-area');
  const params = new URLSearchParams(location.search);
  if (params.get('company')) form.company.value = params.get('company');
  if (params.get('service')) form.topic.value = params.get('service');
  function validate() {
    let ok = true;
    [['name', v => v.trim().length > 1, 'Please enter your name.'], ['email', v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), 'Enter a valid email address.'], ['message', v => v.trim().length > 9, 'Tell us a little more (10+ characters).']].forEach(([n, test, msg]) => {
      const f = form[n], e = document.getElementById('err-' + n), good = test(f.value);
      e.textContent = msg; e.style.display = good ? 'none' : 'block'; f.setAttribute('aria-invalid', !good); if (!good) ok = false;
    });
    return ok;
  }
  const text = () => `Hello NetNote Group,\n\nCompany: ${form.company.value}\nService: ${form.topic.value || 'General enquiry'}\nName: ${form.name.value}\nEmail: ${form.email.value}\nPhone: ${form.phone.value || '-'}\n\n${form.message.value}`;
  const subject = () => 'Enquiry: ' + (form.topic.value || form.company.value);
  formEl.addEventListener('submit', e => { e.preventDefault(); if (validate()) NN.sendPanel(area, subject(), text()); });
  document.getElementById('send-whatsapp').addEventListener('click', () => {
    if (!validate()) return;
    const w = window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(text()), '_blank', 'noopener');
    if (!w) NN.sendPanel(area, subject(), text());
  });
})();
