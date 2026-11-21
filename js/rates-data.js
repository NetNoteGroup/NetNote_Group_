/* Rates shown on rates.html, service pages and used by the chatbot.
   Easiest way to change them: use the "Rates" tab in your Google Sheet (see the Content Update Guide).
   price 0 = "Request a quote". unit: "" (from), "/hr", "/mo", or "exact" (fixed price). */
window.NN_RATES = {
 "note": "Prices are starting rates in Kenya shillings (KSh). Your final quote depends on the site, equipment and scope of work. Quotes are valid for 14 days. Travel fees may apply depending on site location.",
 "categories": [
  {
   "name": "CCTV & Security",
   "items": [
    {
     "title": "4-camera CCTV package",
     "desc": "Supply and installation with DVR, cabling and phone viewing.",
     "price": 35000,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "8-camera CCTV package",
     "desc": "Larger premises: more cameras, bigger storage, full setup.",
     "price": 60000,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "IP camera / NVR system",
     "desc": "High-resolution networked cameras with NVR and PoE.",
     "price": 80000,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "Remote viewing setup",
     "desc": "View your cameras live from your phone anywhere.",
     "price": 3000,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "CCTV maintenance and repair",
     "desc": "Fault diagnosis, camera and DVR servicing per visit.",
     "price": 2500,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "Access control and alarms",
     "desc": "Biometric or card access and alarm systems.",
     "price": 0,
     "unit": "",
     "svc": "surveillance-access"
    },
    {
     "title": "Cybersecurity and security audit",
     "desc": "Firewall setup, vulnerability checks and network security.",
     "price": 0,
     "unit": "",
     "svc": "security-audit"
    }
   ]
  },
  {
   "name": "Networking & IT Support",
   "items": [
    {
     "title": "Wi-Fi setup",
     "desc": "Home or office Wi-Fi design, installation and tuning.",
     "price": 5000,
     "unit": "",
     "svc": "network-design"
    },
    {
     "title": "Internet installation",
     "desc": "Router, cabling and connectivity setup.",
     "price": 3500,
     "unit": "",
     "svc": "network-design"
    },
    {
     "title": "Network troubleshooting visit",
     "desc": "On-site diagnosis and fix for slow or failing networks.",
     "price": 2500,
     "unit": "",
     "svc": "managed-it"
    },
    {
     "title": "Computer repair and software",
     "desc": "Repairs, installs, upgrades and clean-ups.",
     "price": 1000,
     "unit": "",
     "svc": "managed-it"
    },
    {
     "title": "IT consultancy",
     "desc": "Advice on systems, networks and tools, per hour.",
     "price": 2500,
     "unit": "/hr",
     "svc": "managed-it"
    },
    {
     "title": "LAN and structured cabling",
     "desc": "Cabling, racks and network points for offices and buildings.",
     "price": 0,
     "unit": "",
     "svc": "network-design"
    },
    {
     "title": "Server installation and maintenance",
     "desc": "Server setup, backups, monitoring and support.",
     "price": 0,
     "unit": "",
     "svc": "managed-it"
    }
   ]
  },
  {
   "name": "Websites & Software",
   "items": [
    {
     "title": "Portfolio or landing page",
     "desc": "One-page responsive site with contact buttons.",
     "price": 15000,
     "unit": "",
     "svc": "web-design"
    },
    {
     "title": "Business website",
     "desc": "Multi-page responsive site with your branding.",
     "price": 35000,
     "unit": "",
     "svc": "web-design"
    },
    {
     "title": "E-commerce website",
     "desc": "Online shop with products, cart and payments.",
     "price": 80000,
     "unit": "",
     "svc": "web-design"
    },
    {
     "title": "Domain, hosting and email",
     "desc": "Domain registration, hosting and business email setup.",
     "price": 5000,
     "unit": "",
     "svc": "web-design"
    },
    {
     "title": "Website maintenance",
     "desc": "Updates, backups and fixes every month.",
     "price": 3000,
     "unit": "/mo",
     "svc": "web-design"
    },
    {
     "title": "Digital business card (NFC + QR)",
     "desc": "Tap-to-share NFC card with a QR code linking to your digital profile. Annual maintenance: KSh 500.",
     "price": 5000,
     "unit": "exact",
     "svc": "web-design"
    },
    {
     "title": "Custom-branded digital business card",
     "desc": "NFC and QR card designed with your business colours, logo and branding. Annual maintenance: KSh 500.",
     "price": 6000,
     "unit": "exact",
     "svc": "web-design"
    },
    {
     "title": "Custom web or mobile app",
     "desc": "Software built around your business needs.",
     "price": 0,
     "unit": "",
     "svc": "software-erp"
    }
   ]
  },
  {
   "name": "Robotics & Drones",
   "items": [
    {
     "title": "Drone mapping and survey",
     "desc": "Aerial mapping and land surveys.",
     "price": 0,
     "unit": "",
     "svc": "aerial-survey"
    },
    {
     "title": "Agricultural drone solutions",
     "desc": "Crop monitoring and precision agriculture.",
     "price": 0,
     "unit": "",
     "svc": "aerial-survey"
    },
    {
     "title": "Drone and robotics training",
     "desc": "Operations, safety and flight planning.",
     "price": 0,
     "unit": "",
     "svc": "drone-training"
    },
    {
     "title": "Custom UAV or embedded project",
     "desc": "Design and build of autonomous systems.",
     "price": 0,
     "unit": "",
     "svc": "drone-training"
    }
   ]
  }
 ]
};
