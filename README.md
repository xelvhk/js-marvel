# js-marvel

Vanilla JavaScript mini-app that loads Marvel characters from a public API and renders cards + modals.

## Problem
Need a simple frontend project that demonstrates:
- external API integration
- async loading and error handling
- dynamic DOM rendering without frameworks

## Stack
- HTML5
- CSS (Bootstrap 5)
- JavaScript (ES6+)
- Public Superhero API: `https://akabab.github.io/superhero-api/`

## Setup
No build step required.

```bash
git clone https://github.com/xelvhk/js-marvel.git
cd js-marvel
cp .env.example .env
# open index.html in browser
```

Or run any local static server, for example:
```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Architecture
- `index.html`: layout, containers, bootstrap imports
- `index.js`: API call + card/modal template functions
- `start.js`: app bootstrap and UI error states

## Demo / Screenshots
- Live demo: [https://xelvhk.github.io/js-marvel/](https://xelvhk.github.io/js-marvel/)
- Screenshots placeholder: add images to `docs/screenshots/`

## Roadmap
- [ ] Add search/filter by hero name
- [ ] Add client-side pagination
- [ ] Add unit tests for mapper functions
- [ ] Improve accessibility (ARIA labels, keyboard modal flow)
