# Terminal Portfolio

A retro, terminal-themed personal website designed with a focus on performance, aesthetics, and ease of content management. The site mimics an old CRT monitor with a scanline effect, a blinking block cursor, and a warm autumn-inspired color palette.

![Terminal Theme](https://img.shields.io/badge/Theme-Terminal-9b2d2d)
![License](https://img.shields.io/badge/License-ISC-blue)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF)

## 🚀 Features

- **Retro Aesthetic**: Old-school terminal look with scanline effects and a customizable warm charcoal/burgundy color scheme.
- **Interactive Terminal**: Simulated typing animations and a functional command-line interface for navigation.
- **CMS-Driven Content**: Manage all text, menu items, and ASCII art via a single `config.json` file—no HTML/JS changes required for content updates.
- **Performance Optimized**: Initial page load is <14KB (minified and gzipped, excluding fonts).
- **Mobile Responsive**: Adapts seamlessly to mobile devices in portrait orientation without scrolling issues.
- **Animation Control**: A persistent toggle to enable or disable typing animations for returning visitors.
- **Custom Scrollbar**: Themed scrollbars that integrate perfectly with the retro design.
- **Dynamic Footer**: Automatically updating copyright footer to keep the site current.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cboyd10/personal-site.git
   cd personal-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## 📝 Content Management

The site uses a "headless" approach where the structure and content are separated. All content is managed in `public/config.json`.

### Updating the Menu

Add or modify items in the `menu` array. Each item supports:
- `label`: The text displayed in the menu.
- `type`: `internal` (links to a file like `about.html`) or `external` (opens in a new tab).
- `url`: The destination link.

```json
{
  "label": "GitHub",
  "type": "external",
  "url": "https://github.com/cboyd10"
}
```

### Adding Pages

1. Create a new HTML file (e.g., `projects.html`) by copying `about.html`.
2. Update the script tag to initialize with your new page key: `initTerminal('projects')`.
3. Add the page configuration to the `pages` object in `config.json`:

```json
{
  "projects": {
    "title": "Projects - Chris Boyd",
    "initialLines": ["Loading project list...", " "],
    "content": [
      "Project 1: Terminal Site",
      "Description goes here...",
      " ",
      "Press ENTER to return"
    ]
  }
}
```

### ASCII Art

The `asciiArt` field in `config.json` accepts an array of strings. For multi-line art, use a single string with `\n` characters or multiple entries in the array.

## 🏗️ Build Process

The project uses [Vite](https://vitejs.dev/) for an optimized production build.

### Production Build

```bash
npm run build
```

This command generates a `dist` folder containing:
- Minified JavaScript and CSS.
- Optimized and inlined SVGs.
- **Automatically Minified JSON**: A custom Vite plugin minifies all JSON files in the `dist` directory to save every possible byte.
- Converted `woff2` fonts for maximum compression.

### Target Size

The build is fine-tuned to keep the core assets (HTML, JS, CSS, JSON) under **14KB**, making it extremely fast even on slow connections.

## 📂 Project Structure

- `index.html` / `about.html`: Page templates.
- `style.css`: Global retro styles and animations.
- `terminal.js`: The core terminal engine (ES Module).
- `public/config.json`: The source of truth for all content.
- `assets/`: Icons and fonts.
- `vite.config.js`: Build configuration and custom minification plugins.

## 📜 License

This project is licensed under the ISC License.
