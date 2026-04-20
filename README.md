# CodeFalah

CodeFalah is a Next.js web application for showcasing digital products, SaaS services, marketing pages, and blog articles. The current project is still based on static and file-based data, so it works well as a business landing page, digital product company profile, or an early foundation before adding a more complete backend.

## App Overview

Main features currently available:

- A homepage for promoting digital products and SaaS services
- A `demo` page with a demo request form
- A `tanya-harga` page with a pricing inquiry form
- A blog powered by Markdown files in the `posts/` folder
- Static article detail pages with an auto-generated table of contents
- A global light/dark theme toggle

## Folder and File Architecture

Project structure:

```text
.
|-- components/
|   |-- date.js
|   `-- layout.js
|-- lib/
|   |-- posts.js
|   `-- products.js
|-- pages/
|   |-- _app.js
|   |-- posts/
|   |   `-- [id].js
|   |-- demo.js
|   |-- index.js
|   `-- tanya-harga.js
|-- posts/
|   `-- *.md
|-- public/
|   |-- favicon.ico
|   `-- images/
|       `-- profile.png
|-- styles/
|   |-- blog-home.module.css
|   |-- global.css
|   |-- Home.module.css
|   |-- layout.module.css
|   |-- marketing-pages.module.css
|   `-- utils.module.css
|-- package.json
`-- README.md
```

Folder responsibilities:

- `pages/`: main application routes using Next.js file-based routing
- `components/`: reusable UI components shared across pages
- `lib/`: local helpers and static data sources
- `posts/`: blog content written in Markdown
- `styles/`: global styles and CSS Modules
- `public/`: static assets served directly by the app

## Important Files

- `pages/index.js`: main homepage with product catalog, SaaS section, user reviews, article filters, sorting, and pagination
- `pages/demo.js`: demo request page
- `pages/tanya-harga.js`: pricing inquiry page
- `pages/posts/[id].js`: dynamic route for article detail pages based on the Markdown file slug
- `pages/_app.js`: global app entry that loads the main stylesheet
- `components/layout.js`: global layout, navigation, footer, theme toggle, and common metadata
- `components/date.js`: article date formatter using `date-fns`
- `lib/posts.js`: reads Markdown files, parses front matter, generates article HTML, and builds the table of contents
- `lib/products.js`: static product and SaaS service data

## File Naming Conventions

The project currently follows these naming patterns:

- Next.js pages use lowercase descriptive file names, for example `index.js`, `demo.js`, and `tanya-harga.js`
- Dynamic routes use Next.js bracket notation, for example `pages/posts/[id].js`
- React component files currently use lowercase file names such as `layout.js` and `date.js`, while the exported components use PascalCase
- Helper files in `lib/` use lowercase names based on their domain, for example `posts.js` and `products.js`
- Modular styles use the `*.module.css` format
- Markdown article files use kebab-case slugs, for example `api-versioning-strategy.md`

Consistency suggestions for future files:

- Use `kebab-case` for article file names
- Use route-representative names inside `pages/`
- Keep one primary responsibility per file
- If the component layer grows, consider moving component file names to `PascalCase`

## App Routes

Current routes:

- `/` -> homepage
- `/demo` -> demo page
- `/tanya-harga` -> pricing inquiry page
- `/posts/[id]` -> article detail page

## Current Data Source and Data Schema

This project **does not use a database yet** such as MySQL, PostgreSQL, MongoDB, Prisma, or another ORM. All current data comes from local files and JavaScript objects.

### 1. Article data schema

Article content comes from the `posts/` folder in Markdown format with front matter.

Example file structure:

```md
---
title: 'API Versioning Strategy for Growing Products'
date: '2026-04-07'
---

Article content goes here...
```

Fields currently used by the app:

- `id`: derived from the Markdown file name without the extension
- `title`: article title
- `date`: publication date
- `category`: article category, either from front matter or a fallback in `postMetaMap`
- `tags`: article tags, either from front matter or a fallback in `postMetaMap`
- `author`: optional, defaults to the author defined in `lib/posts.js`
- `contentHtml`: HTML generated from the Markdown content
- `tableOfContents`: auto-generated list of `h2` and `h3` headings

### 2. Product data schema

Product data comes from `lib/products.js`.

`featuredProducts` structure:

```js
{
  id: 'template-landing-page',
  name: 'Template Landing Page',
  description: 'Ready-to-use template for promoting a business with a modern and lightweight design.',
  image: '/images/profile.png',
  category: 'One-Time Purchase Product'
}
```

`featuredSaasServices` structure:

```js
{
  id: 'saas-undangan-online',
  name: 'Digital Online Invitation',
  description: 'An active SaaS service for creating, sharing, and managing digital invitations quickly.',
  badge: 'Active SaaS',
  billing: 'Monthly / yearly subscription model'
}
```

### 3. Database schema

There is no physical database schema in this repository yet.

If the application is expanded into a more complete production system later, likely database entities could include:

- `posts`
- `categories`
- `tags`
- `authors`
- `products`
- `saas_services`
- `demo_requests`
- `pricing_requests`

At the moment, the actual data model is:

- Article content: Markdown files plus front matter
- Product catalog: static JavaScript object arrays
- Demo and pricing forms: UI only, with no persistence yet

## Technology Stack

Main stack:

- Next.js
- React 18
- Node.js
- CSS Modules
- Global CSS
- A Markdown content pipeline

Libraries used according to `package.json`:

- `next`: React framework for routing and application builds
- `react`: main UI library
- `react-dom`: React renderer for the web
- `gray-matter`: parses Markdown front matter
- `remark`: processes Markdown content
- `remark-html`: converts Markdown into HTML
- `date-fns`: formats article dates

## Project Setup

Prerequisites:

- Node.js LTS
- npm

Install dependencies:

```bash
npm install
```

After installation, start development mode:

```bash
npm run dev
```

By default, the app runs at:

```text
http://localhost:3000
```

## Running the App

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

## Adding a New Article

1. Add a new Markdown file inside `posts/`
2. Use a `kebab-case` file name, for example `beginner-api-integration-guide.md`
3. Add at least `title` and `date` in the front matter
4. Add `category`, `tags`, or `author` if needed
5. The article will automatically appear on the homepage and under `/posts/[id]`

Example:

```md
---
title: 'Beginner API Integration Guide'
date: '2026-04-20'
category: 'Backend'
tags: ['api', 'integration', 'backend']
author:
  name: 'CodeFalah Team'
  bio: 'Internal CodeFalah team'
---

Write the article content here.
```

## Testing the App

This repository **does not have an automated test setup yet**. There are no `test`, `lint`, or `type-check` scripts in `package.json`.

Current testing options:

### 1. Manual testing during development

Run:

```bash
npm run dev
```

Then verify these pages and features in the browser:

- Homepage `/`
- `/demo`
- `/tanya-harga`
- Article detail pages under `/posts/[id]`
- Light/dark theme toggle
- Article category filters
- Article pagination

### 2. Production build validation

Run:

```bash
npm run build
```

If the build succeeds, the main routing and static generation flow are working correctly.

## Current Project Notes

- Data is still static and not connected to a backend or database
- The forms do not submit to an API or external service yet
- There is no automated test suite yet
- There is no separate lint configuration exposed in `package.json`

## Suggested Next Improvements

- Add a database and ORM such as Prisma
- Store demo requests and pricing inquiries
- Add form validation and real submit handlers
- Add test automation
- Add per-page and per-article SEO metadata
- Add product detail pages, which are not available yet
