/* NetNote Group site settings — the only file you may ever need to edit.
   1) Contact details used by every button on the site.
   2) Google Sheet links that let you publish blogs, vlogs, photos and client logos WITHOUT touching code.
      (See the "Content update guide" for the 5-minute setup.) Leave a link as '' until you have it. */
window.NN_CONFIG = {
  email: 'netnotechronicles@gmail.com',
  whatsapp: '254798232855',
  phone: '+254 798 232 855',
  rateCard: 'https://netnotegroup.github.io/rate-card/',
  // Optional: a Formspree/Web3Forms endpoint so forms send straight to your email with no email app needed.
  formEndpoint: '',
  // Social links shown as icons. Leave empty to hide an icon; paste a link to show it.
  social: { linkedin: 'https://www.linkedin.com/in/daniel-kariuki-b25333236/', x: 'https://x.com/Aj_Aq9', github: 'https://github.com/NetNoteGroup', telegram: '', tiktok: '' },
  sheets: {
    posts: '',    // Published CSV link of the "Posts" tab
    gallery: '',  // Published CSV link of the "Gallery" tab
    clients: '',  // Published CSV link of the "Clients" tab
    rates: ''     // Published CSV link of the "Rates" tab (optional)
  }
};
