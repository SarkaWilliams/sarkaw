# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for an individual/business coach (Šárka Williams), built with Astro (no UI framework — plain `.astro` components). Single page, all content in Czech.

## Commands

```
npm install                # install deps
astro dev --background     # start dev server (localhost:4321) in background
astro dev stop|status|logs # manage the background dev server
npm run build              # build static output to ./dist
npm run preview            # serve the built ./dist locally
npm run deploy              # build + deploy to Cloudflare Pages (wrangler)
```

There is no lint, typecheck, or test script configured — `tsc`/`astro check` are available via `npm run astro -- check` but aren't wired into any script.

## Architecture

**Content/markup split.** All page copy lives in `src/content/pages/home.json`, typed by the `HomeContent` interface in `src/lib/content.ts` and imported everywhere as `home`. Components (`Hero`, `Offerings`, `About`, `Testimonials`, `Contact`) never hardcode copy — they read from `home`. When adding a new piece of content, add the field to `home.json` *and* the `HomeContent` interface, not just one or the other. Note `home.services` is defined in both the JSON and the interface but is currently not rendered by any component.

**Page composition.** `src/pages/index.astro` assembles the page as `Layout > Header + [Hero, Offerings, About, Testimonials, Contact] + Footer`. Section components each own an `id` (`#hero`, `#co-nabizim`, `#o-mne`, `#reference`, `#kontakt`) that the nav links in `Header.astro` hash-link to — keep these in sync if a section is renamed or reordered.

**CMS (Sveltia).** `public/admin/` is a git-backed visual editor (Sveltia CMS, GitHub backend) for `src/content/pages/home.json`, served at `/admin`. `public/admin/config.yml` maps CMS fields 1:1 to that JSON's shape — if you rename/add/remove a field in `home.json`/`content.ts`, update `config.yml` too or the CMS and site will drift apart. Auth goes through a separate Cloudflare Worker (`sarkaw-cms-auth`), not through this repo.

**Styling.** Design tokens (colors, fonts, radius, max-width) are CSS custom properties in `:root` in `src/styles/global.css` — per the TODO there, current values are placeholders pending the client's real brand colors/fonts; changing the tokens re-themes the whole site. Everything else is component-scoped `<style>` blocks inside each `.astro` file. The decorative background image is set once on `body` in `global.css` (`background-attachment: fixed`, disabled on mobile for perf) and shows through every section by default since sections have no background of their own. The `Hero` section is the one exception: it layers its own portrait photo (`--hero-image`, `background-size: contain`) on top of the same site background image (`background-size: cover`) using multi-layer `background-*` properties — if you touch `Hero.astro`'s background, keep both layers and the mobile override (which drops both and falls back to an inline `<img>`) in sync.

**Deploy.** This project deploys to **Cloudflare Pages via Wrangler direct upload** (`npm run deploy` → `wrangler pages deploy dist --project-name=sarkaw`), not Vercel and not Cloudflare's git integration. See `prompt-claudecode-git-cloudflare.md` for the full setup rationale/history.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
