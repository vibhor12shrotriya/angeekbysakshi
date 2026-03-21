# Angeek By Sakshi — Studio Billing System

> Internal billing, inventory & customer management for a lehenga and indo-western studio.  
> **No backend, no server cost — pure HTML/CSS/JS with localStorage.**

---

## ✦ Features

| Module | What it does |
|---|---|
| **Dashboard** | Revenue stats, pending returns, 7-day chart, inventory status |
| **New Bill** | Create rental or sale invoices with live preview |
| **Invoices** | Full list with search, filters, view, status tracking |
| **Customers** | Directory, booking history, deposit alerts |
| **Inventory** | Outfit catalog with availability, add/edit items |
| **Payments** | Track dues, deposits, record additional payments |
| **Reports** | Monthly revenue, rent vs sale charts, GST toggle |
| **WhatsApp** | Pre-filled messages for invoices and reminders (no API key) |
| **Print / PDF** | Browser print dialog → Save as PDF |

---

## 🚀 Hosting on GitHub Pages (Recommended — Free)

### Step 1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `angeek-studio-billing` (or anything you like)
3. Set to **Private** (important — this is internal business data)
4. Click **Create repository**

### Step 2 — Upload the files

**Option A — GitHub web interface (easiest)**

1. In your new repo, click **"uploading an existing file"**
2. Drag and drop the entire `angeek-studio/` folder contents
3. Click **Commit changes**

Make sure the structure looks like this in GitHub:
```
index.html          ← must be at the root
css/
  base.css
  components.css
  layout.css
js/
  data.js
  storage.js
  utils.js
  app.js
  billing.js
  invoices.js
  customers.js
  charts.js
assets/
  favicon.svg
README.md
```

**Option B — Git command line**

```bash
cd angeek-studio
git init
git add .
git commit -m "Initial commit — Angeek Studio Billing"
git remote add origin https://github.com/YOUR_USERNAME/angeek-studio-billing.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select: `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)`
4. Click **Save**
5. Wait ~60 seconds, then visit:  
   `https://YOUR_USERNAME.github.io/angeek-studio-billing/`

That's it. The app is live. ✓

> **Note:** Since the repo is Private, the Pages site will still be publicly accessible via the URL.  
> To restrict access, upgrade to GitHub Pro ($4/month) which allows private Pages.

---

## 💾 Data Storage

All data is stored in your **browser's localStorage** on the device you use.

- Data **does not sync** across devices — it stays on one browser
- **Always use the same browser/device** for billing
- Take regular backups via: Dashboard → **Backup Data** button → saves a `.json` file

### Restoring a backup (future VPS deployment)

When you move to a real server with a database, you can import the backup JSON file into your database directly.

---

## 🖥 Future: Deploying to a VPS (Production)

When you're ready to go server-side with a real database:

### Recommended Stack
- **VPS:** DigitalOcean Droplet (2GB RAM, $12/month) or Hetzner (cheaper)
- **Backend:** Next.js 14 (App Router) or Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Process manager:** PM2
- **Reverse proxy:** Nginx
- **SSL:** Certbot (free Let's Encrypt)

### Quick VPS Setup

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Nginx & Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# 4. Install PM2
sudo npm install -g pm2

# 5. Clone your repo
git clone https://github.com/YOUR_USERNAME/angeek-studio-billing.git
cd angeek-studio-billing

# 6. Configure Nginx
sudo nano /etc/nginx/sites-available/angeek
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /home/ubuntu/angeek-studio-billing;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# 7. Enable site
sudo ln -s /etc/nginx/sites-available/angeek /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 8. Add SSL (after pointing your domain to the VPS IP)
sudo certbot --nginx -d yourdomain.com
```

The static HTML/JS app requires no Node.js or database — just Nginx serving files.

---

## 📱 Using on Mobile

The app is responsive. On mobile:
- The sidebar collapses to icon-only
- All forms are touch-friendly
- WhatsApp button opens the app directly

Add to home screen on iPhone: Safari → Share → "Add to Home Screen"  
Add to home screen on Android: Chrome → Menu → "Add to Home screen"

---

## 🔒 Security Notes

- This is an **internal tool** — don't share the GitHub Pages URL publicly
- No passwords are required by default (it's designed for single-owner use)
- All data is in localStorage — clearing browser data will erase records
- **Always backup regularly** using the Dashboard → Backup Data button

---

## 📦 File Structure

```
angeek-studio-billing/
├── index.html              # App shell & navigation
├── css/
│   ├── base.css            # Design tokens, reset, typography
│   ├── components.css      # Buttons, forms, cards, modals, badges
│   └── layout.css          # Sidebar, main, responsive grid
├── js/
│   ├── data.js             # Seed data & constants
│   ├── storage.js          # localStorage layer (all CRUD + export)
│   ├── utils.js            # Formatting, helpers, toast, modals
│   ├── app.js              # Router + Dashboard module
│   ├── billing.js          # New bill form + invoice generation
│   ├── invoices.js         # Invoice list + detail modal
│   ├── customers.js        # Customers + Inventory + Payments + Reports
│   └── charts.js           # Chart.js wrappers + WhatsApp + PDF print
├── assets/
│   └── favicon.svg
└── README.md
```

---

## ✦ Customising for Your Studio

Edit `js/data.js` to update:

```js
const STUDIO = {
  name:    'Angeek By Sakshi',      // Your studio name
  tagline: 'Premium Lehenga...',    // Shown on invoices
  address: 'Gurugram, Haryana',
  phone:   '+91 98765 43210',
  email:   'angeekbysakshi@gmail.com',
  invoicePrefix: 'INV',             // e.g. ABS → ABS-2025-001
  invoiceYear:   '2025',
};
```

---

*Built for Angeek By Sakshi · Gurugram · 2025*
