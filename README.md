# Zynique — Profile Site

Static one-page site (no build step). Layout follows wireframe 1a "Editorial Giant".

## Scroll effects
- Smooth scrolling: Lenis, synced to GSAP's ticker
- Hero: line-by-line type reveal, parallax featured image
- "Websites / Software / POS": pinned section, words swap as you scroll
- Selected work: horizontal reel driven by vertical scroll
- About: words light up as you scroll
- Testimonials marquee, cursor follower on project cards, hide-on-scroll nav

Libraries are vendored in `vendor/` (GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13).
All motion is skipped when the visitor has "reduce motion" turned on.

## Run locally
```bash
python3 -m http.server 8080
```
