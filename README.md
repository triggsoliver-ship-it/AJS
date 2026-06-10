# AJS Vehicle Services — Website

A fast, responsive single-page website for AJS Vehicle Services, an independent garage in Picket Piece, Andover. Built as a static site (HTML, CSS, JS) — no build step required — ready to launch on GitHub + Vercel.

## What's included

```
AJS Website/
├── index.html        Main page (hero, services, about, gallery, contact)
├── css/styles.css    Brand styling (black / blue / red / silver)
├── js/main.js        Mobile nav, scroll animations, gallery lightbox
├── images/
│   ├── logo.png      Company logo
│   ├── favicon.png   Browser tab icon
│   └── gallery/      Drop your gallery photos here
├── vercel.json       Vercel config (clean URLs + security headers)
├── .gitignore
└── README.md
```

## Key features

- "Start a conversation about work" buttons link straight to **WhatsApp** (07399 479952)
- Facebook link to the AJS Vehicle Services page in the nav, gallery and footer
- Floating WhatsApp button on every screen
- Click-to-call and click-to-email contact details
- Fully responsive (mobile, tablet, desktop) with a slide-out mobile menu

## Add your gallery photos

The gallery currently shows placeholders. To add real photos:

1. Save your images into `images/gallery/` (e.g. `1.jpg`, `2.jpg` …). Landscape 4:3 shots look best.
2. In `index.html`, find the `#galleryGrid` section and replace each placeholder line:

   ```html
   <figure class="gallery-item placeholder"><span>Add photo 1</span></figure>
   ```

   with an image:

   ```html
   <figure class="gallery-item"><img src="images/gallery/1.jpg" alt="AJS workshop" loading="lazy"></figure>
   ```

3. Save — the lightbox (click to enlarge) works automatically.

> Tip: you can download photos from the Facebook page and drop them into `images/gallery/`.

## Launch with GitHub + Vercel

1. **Create a GitHub repo** and push these files:
   ```bash
   cd "AJS Website"
   git init
   git add .
   git commit -m "Initial AJS Vehicle Services website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ajs-website.git
   git push -u origin main
   ```
2. Go to **vercel.com**, sign in with GitHub, click **Add New → Project**, and import the repo.
3. Framework preset: **Other**. No build command or output directory needed — just **Deploy**.
4. Your site goes live on a `*.vercel.app` URL. Add a custom domain under **Settings → Domains** when ready.

## Editing content

All text is plain HTML in `index.html` — phone number, address, opening hours and service descriptions can be edited directly. Colours live as CSS variables at the top of `css/styles.css`.

---

© AJS Vehicle Services · Unit 142-144, The Commercial Centre, Picket Piece, Andover, SP11 6RU
