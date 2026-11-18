# MG MOTORS SERVICES Website

Professional website for **MG MOTORS SERVICES – Mechanical and Electrical Spl Works**, an automobile workshop in Subhan Colony, Chandrayangutta, Hyderabad.

## 🚀 Quick Start

### Local Development
```bash
# Option 1: Python (recommended)
python -m http.server 8000

# Option 2: Node.js
npx serve .

# Option 3: PHP
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

### Production Build
No build step required — this is a static HTML/CSS/JS site. Deploy the entire folder as-is.

---

## 📁 Project Structure

```
MG Motors/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # Main stylesheet
├── js/
│   └── main.js          # Main JavaScript
├── assets/
│   ├── icons/           # SVG icons (8 service icons)
│   └── images/          # Images (hero-bg.jpg, favicon.svg, etc.)
├── robots.txt           # Search engine directives
├── sitemap.xml          # XML sitemap
├── site.webmanifest     # PWA manifest
├── netlify.toml         # Netlify deployment config
└── README.md            # This file
```

---

## 🎨 Technology Stack

| Layer | Technology |
|-------|------------|
| HTML  | Semantic HTML5 |
| CSS   | Custom Properties (CSS Variables), Flexbox, Grid |
| JS    | Vanilla ES6 (IIFE module pattern) |
| Fonts | Inter (Google Fonts, self-hosted via preconnect) |
| Icons | Custom SVG icons + inline SVG sprite |
| Deploy| Netlify (recommended) / Vercel / Cloudflare Pages |

---

## ✨ Features Implemented

### Core Functionality
- ✅ Responsive navigation with mobile hamburger menu
- ✅ Smooth scroll for anchor links
- ✅ Click-to-call (`tel:`), email (`mailto:`), WhatsApp (`wa.me:`)
- ✅ Google Maps embed + "Get Directions" link
- ✅ Mobile sticky CTA bar (Call + WhatsApp)
- ✅ Scroll-triggered animations (IntersectionObserver)
- ✅ Active navigation link highlighting on scroll
- ✅ Header shadow on scroll
- ✅ Automatic copyright year update

### SEO & Metadata
- ✅ Semantic HTML5 structure
- ✅ Meta title, description, theme-color
- ✅ Open Graph (Facebook/LinkedIn) tags
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ JSON-LD LocalBusiness structured data (AutoRepair)
- ✅ XML Sitemap (`sitemap.xml`)
- ✅ Robots.txt (`robots.txt`)
- ✅ Favicon (SVG + PNG fallback references)
- ✅ Web App Manifest (`site.webmanifest`)

### Performance
- ✅ Preconnect hints for critical third-party origins
- ✅ Font-display: swap via Google Fonts URL
- ✅ Lazy-loading for Google Maps iframe
- ✅ Long-term caching headers via `netlify.toml`
- ✅ No unnecessary third-party scripts
- ✅ Minimal CSS/JS (no frameworks)

### Accessibility
- ✅ Skip to main content link
- ✅ ARIA labels and roles
- ✅ Focus-visible styles
- ✅ Semantic heading hierarchy (h1 → h2 → h3)
- ✅ Alt attributes for images (empty for decorative icons)
- ✅ Reduced motion support
- ✅ Keyboard-navigable mobile menu

### Design
- ✅ MG MOTORS SERVICES brand identity (Navy #081426, Red #e51b23)
- ✅ Custom brand mark (CSS-only, no image dependency)
- ✅ Fluid typography with `clamp()`
- ✅ Consistent spacing scale (CSS variables)
- ✅ Professional service cards with SVG icons
- ✅ Why Choose Us section with 6 value propositions
- ✅ Workshop gallery (placeholders for real photos)
- ✅ Comprehensive footer with hours, links, contact

---

## 🌐 Deployment

### Recommended: Netlify (Free Tier)

**Option A: Drag & Drop (Simplest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `MG Motors` folder onto the page
3. Netlify gives you a `*.netlify.app` URL instantly

**Option B: Git Integration (Recommended for Updates)**
1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket)
2. In Netlify: "Add new site" → "Import an existing project"
3. Connect your repo, build settings are auto-detected from `netlify.toml`
4. Deploy!

### Custom Domain Setup

**In Netlify Dashboard:**
1. Site settings → Domain management → "Add custom domain"
2. Enter your domain (e.g., `mgmotors.in`)
3. Netlify provides DNS records to configure

**DNS Records (at your domain registrar):**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 75.2.60.5 | 3600 |
| CNAME | www | your-site.netlify.app | 3600 |

*Or use Netlify DNS (nameservers) for full management.*

**SSL/HTTPS:** Automatic via Let's Encrypt (usually provisions within minutes).

---

## 🔧 Configuration

### Update Domain References
After securing your domain, update these files:

**`index.html`:**
```html
<link rel="canonical" href="https://YOUR-DOMAIN/">
<meta property="og:url" content="https://YOUR-DOMAIN/">
<meta property="og:image" content="https://YOUR-DOMAIN/assets/images/og-image.jpg">
<!-- ... Twitter tags ... -->
```

**`sitemap.xml`:**
```xml
<loc>https://YOUR-DOMAIN/</loc>
```

**`robots.txt`:**
```
Sitemap: https://YOUR-DOMAIN/sitemap.xml
```

**`netlify.toml`:** No changes needed (works with any domain).

### Add Real Images
Replace placeholders in `assets/images/`:
- `hero-bg.jpg` — Workshop/automotive hero image (2000px wide recommended)
- `og-image.jpg` — 1200×630px social sharing image
- `workshop-interior.jpg`, `diagnostics.jpg`, `service-bay.jpg` — Gallery photos
- `favicon-16.png`, `favicon-32.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png` — Generated from `favicon.svg`

**Generate favicons:** Use [realfavicongenerator.net](https://realfavicongenerator.net/) with `assets/images/favicon.svg`.

---

## 🧪 Testing Checklist

### Pre-Deployment
- [ ] Open `index.html` locally — no console errors
- [ ] Test all links: `tel:`, `mailto:`, `wa.me:`, anchor links, Google Maps
- [ ] Verify mobile menu opens/closes, overlay works, Escape key closes
- [ ] Test responsive: 320px, 768px, 1024px, 1440px+
- [ ] Verify WhatsApp prefill messages work
- [ ] Check `sitemap.xml` and `robots.txt` are accessible
- [ ] Validate HTML: [validator.w3.org](https://validator.w3.org/)
- [ ] Test Lighthouse: Performance, Accessibility, Best Practices, SEO > 90

### Post-Deployment
- [ ] Custom domain loads with HTTPS
- [ ] `www` redirects to apex (or vice versa)
- [ ] Google Search Console: submit sitemap, request indexing
- [ ] Test WhatsApp/Call/Email/Map links on real mobile device
- [ ] Verify JSON-LD with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check Core Web Vitals in PageSpeed Insights

---

## 📝 Maintenance

### Content Updates
- **Services:** Edit service cards in `index.html` (lines 81–124)
- **Why Choose Us:** Edit why-cards (lines 155–198)
- **Contact Info:** Update in header, footer, contact section, JSON-LD
- **Hours:** Update in footer (lines 307–310) and JSON-LD openingHoursSpecification
- **Copyright Year:** Auto-updated via JS

### Adding Gallery Photos
1. Add JPGs to `assets/images/`
2. Replace `.gallery-placeholder` divs with `<img src="assets/images/your-photo.jpg" alt="...">`
3. Keep aspect-ratio 4:3 via CSS

### Style Customization
All design tokens in `css/styles.css` lines 6–90:
- Colors, spacing, typography, shadows, transitions, breakpoints
- Modify `:root` variables for global changes

---

## 📄 License

© 2024 MG MOTORS SERVICES. All rights reserved.
Custom website for MG MOTORS SERVICES – Mechanical and Electrical Spl Works.

---

## 🤝 Support

For technical questions about this website implementation, refer to the code comments in `css/styles.css` and `js/main.js`, or consult the deployment platform documentation (Netlify/Vercel/Cloudflare).