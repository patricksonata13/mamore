# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Stone Brothers** is a static HTML/CSS/JS website for a marble and granite business (*marmoraria*) based in Jacarepaguá, Rio de Janeiro, Brazil. No build system, no package manager, no framework — pure vanilla HTML5, CSS3, and ES6+ JavaScript.

## Running Locally

```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

No build step required. There are no tests or linters configured.

> **Important:** Several features depend on a local webhook server running at `http://localhost:5679` (AI configurator, lead capture, gallery loading, image search). Without this backend, those features will fail silently or show error states.

## Architecture

### Page Structure

The site has two sets of HTML pages:
- **Root-level**: `index.html`, `admin.html`, `galeria.html`, plus `contato.html`, `materiais.html`, `projetos.html`, `inspiracoes.html`, `sobre.html` (duplicates of `pages/`)
- **`pages/`**: The canonical sub-pages linked from navigation

### JavaScript

`js/main.js` is the shared data and rendering layer. It defines three global arrays (`materiais`, `projetos`, `posts`) and rendering functions (`renderizarMateriais`, `renderizarProjetos`, `renderizarPosts`) that write into DOM elements by ID. It is loaded by sub-pages.

`js/app.js` is a legacy stub with a minimal older data structure — it is not the active entry point and is effectively unused.

`index.html` contains all its JS inline in a `<script>` block at the bottom of the body. This inline script re-defines `materiais` with richer data (including local image paths) and all interactive logic independently of `js/main.js`.

### Styling

Most styles are **inline `<style>` tags** within each HTML file. `css/style.css` (48 lines) is an older stub that conflicts with the inline styles and is not the source of truth for the current design. The active design system uses:
- Fonts: Cormorant Garamond (serif/display), DM Sans (body) via Google Fonts
- Color palette: `#fafaf7` (background), `#0e0e0e` (text/CTA), `#8a7f71` (muted/accent), `#c8bfae` (warm accent), `#ede8e0` (hero panel)

### Backend Integration (Webhook at `localhost:5679`)

All dynamic features proxy through a local webhook server. The frontend calls:

| Endpoint | Used in | Purpose |
|---|---|---|
| `POST /api/describe/groq` | `index.html` | Groq AI text description for the configurator |
| `POST /api/lead` | `index.html` | Lead capture from the quote form |
| `GET /api/list-images` | `index.html` | Loads the gallery section |
| `GET /api/search/{source}?q=` | `admin.html` | Image search (unsplash/pexels/pixabay/freepik) |
| `POST /api/save-image` | `admin.html` | Downloads and saves image to `imagens/` folder |

### AI Configurator Flow (`index.html`)

1. User selects material, type, dimensions, finish (`acabamento`), and sink config
2. `gerarVisual()` calls `POST /api/describe/groq` with the configuration
3. Response `description` is displayed (trimmed to 160 chars) below the preview
4. A Canvas element generates a simple color-gradient countertop preview using a hardcoded `cores` map keyed by material name
5. WhatsApp deeplink (`wa.me/5521999990000`) is used to send the quote

### Admin Panel (`admin.html`)

Standalone dark-themed page for image management. Searches external stock photo APIs via the webhook, then saves selected images to `imagens/galeria/`, `imagens/portfolio/`, or `imagens/materiais/`. Images are auto-committed to git by the webhook backend.

## Key Conventions

- **Language**: The site content, variable names, function names, and comments are all in **Brazilian Portuguese**
- **Images**: Served from `imagens/` (with an unused duplicate at `images/`). Gallery images go in `imagens/galeria/`, portfolio in `imagens/portfolio/`, material swatches in `imagens/materiais/`
- **Placeholders**: `js/main.js` uses `placehold.co` URLs for images; `index.html` uses local paths from `imagens/materiais/` with `onerror` fallback to `placehold.co`
- **WhatsApp number**: `5521999990000` is a placeholder — the real number must be set in `index.html` (two occurrences: `solicitarOrcamentoWhats` and `enviarOrcamento`)
- **Backup files**: Several `.bak*` and `.backup_*` files exist in the root. These are historical artifacts and can be ignored

## File Cleanup Notes

The root contains multiple stale backup files (`index.html.bak`, `index.html.bak_claude`, `index.html.backup_final`, etc.) and a `teste.txt` scratch file. These are not part of the active site.
