# Portfolio — BALABARATHI M

A personal portfolio site built from scratch with plain HTML, CSS, and JavaScript — no framework, no build tools, no template.

**Live site:** [add your GitHub Pages link here once deployed]

---

## About

I'm a Computer Science graduate currently working as a Backend Developer Intern, building REST APIs with Go and PostgreSQL. This site documents what I'm building, what I'm learning, and the projects I've worked on.

## Features

- **Fixed sidebar navigation** with scroll-spy highlighting — the active section lights up as you scroll
- **Scroll progress bar** at the top of the page
- **Scroll-reveal animations** using the Intersection Observer API (no animation library)
- **Interactive project mockups** — a browser mockup, a live-style terminal mockup, and a code-editor mockup, built entirely in CSS
- **Expandable notes/blog section** using native `<details>` — accessible, no extra JavaScript required
- **Fully responsive** — collapses to a mobile top bar with a slide-out menu below 980px
- Respects `prefers-reduced-motion` for accessibility

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, Grid — no framework)
- Vanilla JavaScript (Intersection Observer for scroll effects, no dependencies)
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

## Project Structure

```
portfolio/
├── index.html      # Page structure and content
├── style.css       # All styling
├── script.js       # Scroll reveal, scroll-spy nav, progress bar, mobile menu
├── images/         # Profile photo and any other image assets
└── README.md
```

## Running Locally

No build step needed — just open the file:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
open index.html   # or just double-click index.html
```

## Deployment

Hosted for free on GitHub Pages:

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select the `main` branch and `/ (root)` folder
4. Save — GitHub will publish the site at `https://your-username.github.io/portfolio/`

## What I Learned Building This

- Structuring CSS from scratch without a framework
- Building scroll-based interactions (reveal-on-scroll, scroll-spy, progress bar) with the Intersection Observer API instead of a library
- Designing a responsive layout system (fixed sidebar → mobile top bar) using plain media queries
- Writing accessible, semantic HTML (e.g. using native `<details>` for expandable content instead of custom JS)

## Contact

- Email: iambalabarathi@gmail.com
- LinkedIn: https://www.linkedin.com/in/bala-barathi-0426873a1/

---

Built by BalaBarathi, 2026.
