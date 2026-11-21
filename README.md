# NetNote Group website
Open `index.html` in a browser, or host the whole folder on GitHub Pages. No build step.

## Pages (31)
Home, About, Experience, Rates, How we work, Industries, Clients, Portfolio, Services (+13 service pages), Systems, Aero, Security, Quote, Rate card, FAQ, Insights (blogs & vlogs), Contact, Privacy, Terms.

## Settings: `js/config.js`
Email, WhatsApp, rate-card link, and the Google Sheet links (Posts, Gallery, Clients, Rates) and social links (Telegram and TikTok icons appear once you paste a link).
Paste the sheet links once, then publish blogs, vlogs, photos and client logos from the sheet. See the Content Update Guide.

## Folders
- `css/`  styles   - `js/`  scripts   - `assets/` logos and photos (`assets/photos/`, `assets/clients/`)
- `templates/` CSV templates for the Google Sheet tabs

# NetNote Group Website

**Reliable systems. Secure spaces. Smart solutions.**
*Technology that works as hard as you do.*

The official website of **NetNote Group**, a Nairobi-based group of three companies backed by 7+ years of experience in technology, aerial services and security.

| Company | What it does |
|---|---|
| **NetNote Systems** | Managed IT, web design, software and ERP, networks, cloud and backup |
| **NetNote Aero** | Aerial survey and mapping, drone photography and video, inspections, drone training |
| **NetNote Security** | Cyber security, data protection, CCTV and access control, security audits |

---

## Description

A fast, professional, mobile-friendly website that lets a visitor learn everything about NetNote Group: who we are, what each company does, our experience, our work, our prices, and how to get in touch. Every service has its own page, there is a built-in chat assistant, and the owner can publish blogs, vlogs, photos, client logos and prices from a Google Sheet, with no coding.

It is a **static website** (plain HTML, CSS and JavaScript). There is no build step, no framework and no server to maintain. It runs on free hosting such as GitHub Pages.

## Features

- **31 pages**: company pages, 13 separate service pages, portfolio, rates, quote, FAQ, industries, clients, insights, contact and legal pages
- **Brand theme** taken from the NetNote logo blue, with an accent colour per company (blue, cyan, amber)
- **Interactive home page**: clickable group diagram, "Not sure where to start?" solution finder, animated counters, client logo strip
- **Chat assistant** that answers questions about services, prices, experience and contact details, and hands over to WhatsApp when it cannot help
- **Rates page** with category tabs, starting prices in KSh, and "Request quote" and WhatsApp buttons on every item
- **3-step quote form** that sends by Gmail, email app, WhatsApp, or copy and paste
- **Insights**: blogs and vlogs (YouTube) with search and filters
- **Portfolio** and **photo galleries** with a full-screen viewer
- **Icon buttons** for call, WhatsApp, email and social links
- **No-code content updates** through Google Sheets
- Accessible and responsive: keyboard friendly, skip link, works on phones, tablets and desktops

## Pages

| Group | Pages |
|---|---|
| Main | `index`, `about`, `experience`, `approach` (How we work), `industries`, `clients`, `portfolio`, `faq` |
| Companies | `systems`, `aero`, `security` |
| Services | `services` (hub with filter and search) and 13 pages in `services/` |
| Conversion | `rates`, `quote`, `contact` |
| Content | `blog` (Insights: blogs and vlogs) |
| Legal | `privacy`, `terms` |

**The 13 services**
- *Systems*: Managed IT & Support, Web Design & Development, Software & ERP, Network Design & Deployment, Cloud & Backup
- *Aero*: Aerial Survey & Mapping, Drone Photography & Video, Drone Inspection, Drone Training & Consulting
- *Security*: Cyber Security, Data Protection & Recovery, Surveillance & Access Control, Security Audits & Compliance

## Folder structure

```
netnote-group/
├── index.html, about.html, ... (all pages)
├── services/            13 service pages
├── css/
│   ├── style.css        theme and components
│   └── chatbot.css      chat widget
├── js/
│   ├── config.js        YOUR SETTINGS (contact details, social links, Google Sheet links)
│   ├── main.js          menu, tabs, counters, toasts
│   ├── hero.js          home page group diagram
│   ├── finder.js        "Find your solution" selector
│   ├── services.js      services filter and search
│   ├── rates.js         rates page and price cards
│   ├── quote.js         quote form
│   ├── contact.js       contact form
│   ├── send.js          sending helpers and Google Sheet reader
│   ├── social.js        call, WhatsApp, email and social icons
│   ├── chatbot.js       chat assistant
│   ├── posts.js, blog.js            blogs and vlogs
│   ├── portfolio.js, gallery.js, clients.js
│   └── *-data.js        built-in content (see below)
├── assets/              logos, emblem, favicon
│   ├── photos/          field photos
│   └── clients/         put client logos here
└── templates/           CSV templates for the Google Sheet
```

## Quick start

**Run on your computer:** unzip and double-click `index.html`.

**Put it online with GitHub Pages (free):**
1. Create a repository on GitHub, for example `netnotegroup.github.io`.
2. Choose **Add file > Upload files** and drag in the *contents* of this folder (so `index.html` is at the top level). Click **Commit**.
3. Go to **Settings > Pages**, choose the `main` branch and the root folder, and save.
4. After a minute or two the site is live. Test the WhatsApp, call and email buttons on your phone.

## Settings: `js/config.js`

This is the only file you may ever need to edit.

```js
email: 'netnotechronicles@gmail.com',
whatsapp: '254798232855',
phone: '+254 798 232 855',
formEndpoint: '',            // optional: Formspree or Web3Forms link, so forms send straight to your email
social: { linkedin, x, github, telegram: '', tiktok: '' },   // empty = icon hidden
sheets: { posts: '', gallery: '', clients: '', rates: '' }    // Google Sheet links (below)
```

To edit on GitHub: open the file, click the pencil icon, change it, then **Commit changes**.

## Updating content without code (Google Sheets)

**One-time setup**
1. Create one Google Sheet with four tabs named **Posts**, **Gallery**, **Clients** and **Rates**. Import the matching file from `templates/` into each tab. Keep the first row (headings) exactly as it is.
2. For each tab: **File > Share > Publish to web**, pick the tab, choose **CSV**, click **Publish**, and copy the link.
3. Paste the four links into `js/config.js` under `sheets`.

**After that, you only work in the sheet.** Changes appear on the site within a few minutes. Anything that is not filled in falls back to the built-in content.

| Tab | Columns | Notes |
|---|---|---|
| **Posts** | `date`, `type` (blog or vlog), `category` (systems, aero, security, general), `title`, `author`, `summary`, `body`, `video_url`, `image_url`, `published` | Blank line between paragraphs. For a vlog, paste the YouTube link in `video_url`. Set `published` to `no` to hide a post. |
| **Gallery** | `page` (systems, aero, security or all), `image_url`, `caption` | Appears in "From the field" on that page. |
| **Clients** | `name`, `logo_url` | Shows on the Clients page and the home page strip. |
| **Rates** | `category`, `title`, `description`, `price`, `unit`, `service` | Leave `price` empty for "Price on request". `unit` can be `/hr`, `/mo` or `exact`. |

**Images:** upload to Google Drive, set sharing to "Anyone with the link", and paste the link. The site converts it automatically. Any normal image web address also works. Files uploaded to `assets/photos/` can be used as `assets/photos/name.jpg`.

> The published sheet is public. Do not put private information in it.

## Built-in content you can edit directly

| File | What it controls |
|---|---|
| `js/rates-data.js` | Prices and rate categories |
| `js/portfolio-data.js` | Portfolio projects |
| `js/clients-data.js` | Client names and logos |
| `js/posts-data.js` | Built-in blog and vlog posts |
| `js/site-data.js` | Service list and keywords used by the chat assistant |

## How the chat assistant works

It runs entirely in the visitor's browser using fixed rules, **not AI**. It matches keywords to services, prices, contact details and pages, and shows links. If it does not understand a question, it offers WhatsApp. No messages are stored or sent anywhere. To add answers, edit the `intents` list in `js/chatbot.js`.

## How forms send messages

The site has no server, so the contact and quote forms prepare the message and let the visitor choose: **Open in Gmail**, **Open email app**, **Send on WhatsApp** or **Copy message**. For a one-click "Send now" that goes straight to your inbox, create a free Formspree form and paste its link into `formEndpoint`.

## Customising the look

- **Colours:** change the variables at the top of `css/style.css` (`--blue`, `--navy`, `--systems`, `--aero`, `--security`).
- **Logos:** replace the files in `assets/` (`logo-group.png`, `logo-systems.png`, `logo-aero.png`, `logo-security.png`, `emblem-group.png`).
- **Fonts:** Bricolage Grotesque and Instrument Sans, loaded from Google Fonts.

## Good to know

- The header and footer are repeated in every HTML file. To change the menu or footer, edit each page, or ask for the pages to be regenerated.
- Portfolio projects are **representative examples**. Replace them with your real projects in `js/portfolio-data.js`.
- The "Branding & Design" rates are not in the site yet. Add them in the Rates sheet tab.
- Telegram and TikTok icons appear once their links are added to `config.js`.
- The Aero gallery stays hidden until photos are added.
- The Privacy Policy and Terms of Use are standard templates. Have them reviewed before launch.
- Only use photos and client logos you have permission to display.
- The site email is still `netnotechronicles@gmail.com`. Update `config.js` if you move to a NetNote Group address.

## Browser support

Current versions of Chrome, Edge, Firefox, Safari, and mobile browsers on Android and iOS. The pages need JavaScript for the menu, chat assistant, rates and Google Sheet content.

## Contact

**NetNote Group**
Office No. 11, 1st Floor, Kahawa Sukari, Nairobi, Kenya. Zip Code 00606-3284
Phone / WhatsApp: +254 798 232 855
Email: netnotechronicles@gmail.com

---

© 2026 NetNote Group. All rights reserved. NetNote names and logos belong to NetNote Group; client names and logos belong to their owners.
