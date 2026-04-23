# Portfolio — Arif Mohammad

Personal portfolio site. Live at **[arifmohammad.netlify.app](https://arifmohammad.netlify.app)**.

Data Analyst & Web Developer based in Dijon, France. MSc Data Science (Burgundy School of Business). Open to roles in Data Analytics, BI Development, and Frontend / Full-Stack Engineering.

---

## What's in this repo

This is the source of the portfolio site itself — three files, no build step, no framework. Built deliberately in vanilla HTML/CSS/JS to keep it fast and to demonstrate fundamentals over framework dependency.

```
.
├── index.html      # Markup and content
├── style.css       # Styles, responsive grid, dark theme
├── script.js       # Canvas tessellation, scroll reveal, project filter
└── CV/             # Downloadable CVs (PDF)
```

## Featured technical work

- **Animated canvas background** — Hexagonal Islamic tessellation rendered on `<canvas>` with `requestAnimationFrame`, mouse-influenced phase rotation, smoothstep easing, `devicePixelRatio` handling for retina displays.
- **Vanilla scroll reveal** — `IntersectionObserver`-based element reveals with staggered timing, no library.
- **Filterable project grid** — `data-cat` attribute filtering with state-managed tab UI.

## Design

- **Palette:** Midnight `#0D1117`, teal `#0D9488`, gold `#C9A84C`. Inspired by Hyderabadi cultural aesthetics.
- **Typography:** Cormorant Garamond (display) + DM Sans (body).
- **Hero script:** Urdu name `عارف محمد` honouring origin.

## Deployment

Continuous deployment via Netlify — every push to `main` triggers an automatic build and deploy.

## Contact

- **Email:** arif15031995@gmail.com
- **LinkedIn:** [arif-mohd-577776100](https://www.linkedin.com/in/arif-mohd-577776100/)
- **GitHub:** [@web2arif](https://github.com/web2arif)