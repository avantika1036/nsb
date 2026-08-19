# **NSB Website**

This directory contains the public NSB website built with [Docusaurus](https://docusaurus.io/). It includes the homepage, docs, tutorials, custom React pages, and the shared styles that shape the public site.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
	- [Local Development](#local-development)
	- [Common Commands](#common-commands)
- [Project Structure](#project-structure)
- [Editing Content](#editing-content)
- [Build and Preview](#build-and-preview)
- [Deployment](#deployment)
- [Additional Notes](#additional-notes)

## Overview

The website is the public-facing entry point for NSB. It provides the main landing pages, documentation, tutorials, and project links for users who want to learn about NSB or try it locally.

## Tech Stack

The website is built with:

* **Docusaurus 3.10.2**, for the site framework, docs system, and static site build
* **React 18**, for custom pages and interactive UI pieces
* **TypeScript**, for typed page and configuration code
* **Prism**, for syntax-highlighted code blocks
* **Mermaid**, for diagrams in docs and tutorials
* **CSS**, for the shared site styling and page layout
* **HTML**, for the generated document structure and final site output
* **Markdown and MDX**, for docs, tutorials, and mixed content pages

Supporting packages include **React DOM**, **@mdx-js/react**, **clsx**, **prism-react-renderer**, **@docusaurus/theme-mermaid**, and **@easyops-cn/docusaurus-search-local**.

## Requirements

The following software packages are required to work on the website:

* **Node.js 18+**, used to run the Docusaurus site
* **npm**, used to install dependencies and run the site scripts

## Installation

From this folder, install the dependencies:

```bash
npm install
```

### Local Development

Start the development server:

```bash
npm start
```

Then open the local site at `http://localhost:3000`.

If you need the site to be visible to other devices on your network, start it with:

```bash
npm start -- --host 0.0.0.0
```

### Common Commands

```bash
npm start        # Start the local development server
npm run dev      # Same as npm start
npm run build    # Build the production site
npm run serve    # Preview the built site locally
npm run clear    # Clear Docusaurus caches and generated files
npm run typecheck # Run TypeScript checks
```

## Project Structure

The most important paths in this folder are:

* `docs/` - Main documentation pages for the public docs section
* `tutorials/` - Tutorial content served through a second docs plugin instance
* `src/pages/` - Custom React pages such as About, Get Started, and Quickstart
* `src/css/` - Global site styles, including the shared docs and page styling
* `static/` - Static assets copied directly into the generated site
* `build/` - Generated production output; do not edit files here by hand
* `docusaurus.config.ts` - Site configuration, navbar, footer, theme, and plugins
* `sidebars.ts` - Sidebar structure for the docs section
* `package.json` - Project scripts, dependencies, and Node version requirements

The website layout is intentionally split between content and presentation:

* `docs/` and `tutorials/` hold the public writing content
* `src/pages/` holds custom landing pages and special layout pages
* `src/css/` holds the shared theme and visual styling
* `static/` holds logo files, images, and other fixed assets

## Editing Content

Use Markdown for standard docs pages in `docs/`. Use MDX when a page needs React components or a more custom layout. Use `src/pages/` for standalone pages, and use `src/css/base.css` for shared styling changes.

When editing content, keep the following in mind:

* Prefer short, clear sections that are easy for new users to follow
* Keep code examples explicit and language-tagged
* Make sure custom styling still works in both light and dark mode
* Keep broad CSS overrides to a minimum
* Check whether a change belongs in a docs page, a custom page, or the global CSS before editing
* If you add a new page or section, make sure the navigation still points users to it naturally

## Build and Preview

Generate a production build with:

```bash
npm run build
```

After building, preview the output with:

```bash
npm run serve
```

The site uses the base path `/nsb/`, so deployment should preserve that path.

## Deployment

This website is intended to be deployed to GitHub Pages at `https://nsb-ucsc.github.io/nsb/`.

## Additional Notes

* If the site does not reflect a change, clear the Docusaurus cache with `npm run clear`
* If you add a new page, update the navbar or footer only if it should be discoverable from the main site
* If you add new code block styling, verify that docs pages still look correct in both themes
* For a more detailed working guide for future contributors, see [DEVELOPERS.md](DEVELOPERS.md)
