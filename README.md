# Zynique — Profile Site

A single-page profile site for Zynique. Plain HTML, CSS, and JavaScript. Dark mode. Neon purple accent. Fully responsive.

## Files

- `index.html` — page structure and all content
- `style.css` — all styling
- `script.js` — nav toggle, scroll reveal, card hover, form handler
- `README.md` — this file

## Run it locally

Just double-click `index.html`, or serve the folder with any static server:

```bash
# Python 3
python3 -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080`.

## Edit the content

**Text and copy** — everything lives in `index.html`. Look for the section you want:
- Hero title and tagline: inside `<section id="hero">`
- About paragraphs: inside `<section id="about">`
- Services / cards: inside `<section id="services">` — each `<article class="card">` is one card
- Contact info, email, socials: inside `<section id="contact">`

**Change the email** — search `hello@zynique.com` in both `index.html` and `script.js` and replace it.

**Change social links** — in `index.html` find the `<div class="socials">` block and set each `href="#"` to your real profile URL.

**Change colors** — open `style.css`, top of the file, edit the `:root` variables:
```css
--accent: #a855f7;     /* main accent */
--accent-2: #c084fc;   /* lighter accent for text gradient */
--bg: #0a0a0f;         /* page background */
```

**Change fonts** — the Google Fonts link is at the top of `index.html`. Swap `Inter` and `Space Grotesk` for whatever you want, then update the `font-family` values in `style.css`.

**Change icons** — this site uses [Lucide](https://lucide.dev). To swap an icon, find its `<i data-lucide="name">` tag and change the name to any icon from lucide.dev/icons.

## Deploy updates

After editing, from the repo folder:

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages auto-rebuilds within a minute or two.

## Contact form note

The form uses a `mailto:` link — clicking Send opens your default email app pre-filled. If you want proper form submissions instead, plug in a service like [Formspree](https://formspree.io) or [Getform](https://getform.io) — swap the fetch target in `script.js`.
