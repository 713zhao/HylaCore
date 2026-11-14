# HylaCore website

Static site for HylaCore (no build step). Deployed to Cloudflare Pages at https://hylacore.pages.dev.

- `config.js` — contact email and social links. Paste profile URLs there; empty links are hidden automatically.
- `index.html`, `styles.css`, `main.js` — the landing page.
- `terms.html`, `privacy.html`, `refund.html` — legal pages.

Deploy: `npx wrangler pages deploy . --project-name hylacore`, or connect this repository in Cloudflare Pages with an empty build command and `/` as the output directory.
