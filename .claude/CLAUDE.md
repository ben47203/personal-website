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
- CSS custom properties for theming (Catppuccin Mocha palette)
- Responsive breakpoints: mobile (<768px), tablet (768–1203px), desktop (>1203px)
- Flexbox and CSS Grid for layout
- `@keyframes` for animations
- No `//` comments — use `/* */` only

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
