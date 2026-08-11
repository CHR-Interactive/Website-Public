# CHR Interactive — Website

The public marketing site for **CHR Interactive**, an indie game publishing group.
Live at **[chrinteractive.com](https://chrinteractive.com)**.

Static HTML/CSS/JS — no build step, no framework. Deployed via GitHub Pages.

## Structure

```
├── index.html          Home (what we do, process, deal terms, community)
├── submit.html         Game pitch submission form
├── rules.html          Submission guidelines + terms & conditions
├── privacy.html        Privacy policy
├── 404.html            Not-found page (served automatically by GitHub Pages)
├── css/
│   └── index-style.css Single stylesheet for every page
├── js/
│   └── main.js         Submission form handling
├── favicon.png         Tab icon (+ favicon-180.png for mobile)
└── og-image.png        Social share preview image
```

## Local development

No tooling required. Serve the folder over HTTP so relative paths resolve:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

Pushing to `main` triggers a GitHub Pages build automatically. The site is
served at the custom domain configured in `CNAME` (chrinteractive.com).

## Submissions

The pitch form posts to [Web3Forms](https://web3forms.com), which emails each
submission to the team. The `access_key` in `submit.html` is a public,
client-side identifier — safe to commit. Spam is handled by Web3Forms'
Advanced Spam Filter plus a hidden honeypot field.

## Editing

- **Colors / theme:** the CSS custom properties in the `:root` block at the top
  of `css/index-style.css`.
- **Copy & links:** edited inline in the relevant `.html` file.
- **Deal terms & submission rules:** `index.html` (`#process`) and `rules.html`.
