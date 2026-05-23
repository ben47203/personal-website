# Personal Website — DECO1400 Assignment

## Tech Stack
- Plain HTML, CSS, JavaScript only — NO frameworks, NO npm, NO website builders
- Single external stylesheet: `css/style.css`
- Single external script: `js/script.js`
- No inline CSS (`style="..."`) or internal CSS (`<style>` blocks) anywhere
- No inline JavaScript — all JS in external file

## HTML Conventions
- All filenames lowercase
- Every page: `<!DOCTYPE html>`, `<html lang="en">`, `<head>`, `<body>`
- Required: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`
- Code comments throughout (markers check for them)
- W3C valid HTML

## CSS Conventions
- `box-sizing: border-box` on all elements
- CSS custom properties for theming (Catppuccin Mocha backgrounds + 5-tier accent palette)
- Responsive breakpoints: mobile (<768px), tablet (768–1203px), desktop (>1203px)
- Flexbox and CSS Grid for layout
- `@keyframes` for animations
- No `//` comments — use `/* */` only

## Colour Hierarchy (5-tier accent system)
All accent/border colours use 5 CSS custom properties in strict priority order:
| Tier | Variable     | Hex       | Name           |
|------|-------------|-----------|----------------|
| #1   | `--accent1` | `#1e6e99` | cornflower-ocean |
| #2   | `--accent2` | `#3ebae0` | sky-surge      |
| #3   | `--accent3` | `#87bcc0` | pearl-aqua     |
| #4   | `--accent4` | `#c8d1c7` | ash-grey       |
| #5   | `--accent5` | `#cdc6ae` | pale-oak       |

### Assignment rules
- **Main structural components** (header, sidebar, content pane, footer borders): `--accent1`
- **Main titles** (h1, blinking cursor, breadcrumb current page): `--accent1`
- **Headings** decrease by tier: h2 → `--accent2`, h3 → `--accent3`, h4 → `--accent4`
- **Content-nested divs/borders** (cards, accordions, timeline cards, resume blocks, subject-tree folders): `--accent2`
- **Inner borders within content-nested elements** (card image dividers, accordion expand borders, subject-tree link borders): `--accent3`
- **General rule**: accent elements within a border use 1 tier below that border's colour
- **Highlights within blocks** (dates, badges, accent text): always 1+ tier below the block's border colour (e.g., resume-block border is #2 → dates are #3, node-map dates are #4)
### Hover/Glow/Focus rules
- **Text & links**: hover escalates colour 1 tier above resting state (e.g., `--accent3` → `--accent2`)
- **Block borders**: hover escalates border 1 tier (e.g., card border `--accent2` → `--accent1`)
- **Glow — structural panes** (`.pane`): `--accent1`-based glow via `.pane-glow` class
- **Glow — nested blocks** (cards, resume-blocks, timeline cards, accordions, subject-tree folders): `--accent2`-based softer glow via `.pane-glow-nested` class
- **Focus**: always `--accent1` outline, 2px solid, offset 2px
- **Transitions**: 0.15s–0.3s range, always `ease` timing function
- **JS glow**: deepest hovered container wins; only one element glows at a time
- **RGB variables**: `--accent1-rgb` and `--accent2-rgb` provide bare RGB channels for `rgba()` opacity control in glows

## JavaScript Conventions
- `let` and `const` only — never `var`
- `addEventListener` for event handling
- `document.getElementById()` / `querySelectorAll()` for DOM access
- Arrow functions acceptable

## Design System
- TUI/terminal-inspired aesthetic
- 3-pane tmux-style layout: Header (pane 0), Sidebar (pane 1), Main (pane 2)
- Pane labels embedded in borders via `::before` pseudo-element with `data-pane` attribute
- Monospace font throughout
- Dark theme (Catppuccin Mocha)
- VS Code-style file tree sidebar for navigation

## File Structure
- Root pages: `index.html`, `resume.html`, `projects.html`, `blog.html`, `writing.html`, `help.html`, `contact.html`
- Sub-pages in folders: `projects/`, `blog/`, `writing/`
- Subdirectory pages use `../css/style.css` and `../js/script.js`
- Deeper pages (e.g., `writing/economics/essay-1.html`) use `../../css/style.css`
