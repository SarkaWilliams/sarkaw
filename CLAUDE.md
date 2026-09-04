# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for an individual/business coach (Šárka Williams), built with Astro (no UI framework — plain `.astro` components). One-page layout, available in Czech (default) and English.

## Commands

```
npm install                # install deps
astro dev --background     # start dev server (localhost:4321) in background
astro dev stop|status|logs # manage the background dev server
npm run build               # build static output to ./dist
npm run preview             # serve the built ./dist locally
npm run deploy               # build + deploy to Cloudflare Pages (wrangler)
```

There is no lint or test script configured. `astro check` (type-checking) is available via `npm run astro -- check`, but the required `@astrojs/check`/`typescript` packages aren't installed yet — running it triggers an interactive install prompt.

## Architecture

**Content/markup split, per locale.** All page copy lives in `src/content/pages/home.cs.json` and `home.en.json`, both typed by the `HomeContent` interface in `src/lib/content.ts`. `getHomeContent(locale)` picks the right file from a `homeByLocale` record. Components (`Hero`, `Offerings`, `About`, `Testimonials`, `Process`, `Contact`) never hardcode copy — they read from `home`. When adding a field, update `home.cs.json`, `home.en.json`, *and* the `HomeContent` interface together. Note `home.services` exists in the data/interface but is not rendered by any component. `about.aboutBadges` is a list of `{ image, alt }` objects (certification badge icon + accessible label), rendered in `About.astro` as one row per badge (icon + text), not a bare text list.

**i18n is two separate systems that must stay in sync:**
- `src/lib/i18n.ts` holds the `ui` dictionary (nav labels, section headings, aria labels, etc.) per locale, plus `normalizeLocale()` which defaults anything unrecognized to `cs`. This is UI chrome text, distinct from `home.*.json` page copy.
- `astro.config.mjs` sets `i18n.routing.prefixDefaultLocale: false`, so Czech is served at `/` and English at `/en/`.
- There are two separate homepage entry points — `src/pages/index.astro` (calls `getHomeContent("cs")`) and `src/pages/en/index.astro` (calls `getHomeContent("en")`) — each hardcoding its own locale and assembling the identical component tree. Adding a third locale means adding both a new `home.<locale>.json` and a new `src/pages/<locale>/index.astro`, not just a config change.
- The blog (`src/content/blog/*.md`, collection defined in `src/content.config.ts`) is bilingual using Sveltia's `multiple_files` i18n structure: each post is `<slug>.cs.md` + `<slug>.en.md` sharing the same slug, and routes exist at `/blog[/...]` (cs) and `/en/blog[/...]` (en). The glob loader's default id generation runs filenames through `github-slugger`, which strips dots — `<slug>.cs.md` would collapse to id `<slug>cs`, losing the locale suffix — so both `blog` and `perspectives` collections pass a custom `generateId` that keeps `.cs`/`.en` intact as an explicit id suffix; pages filter `post.id.endsWith(".cs")`/`.endsWith(".en")` and strip that suffix to build the URL slug. `Layout.astro`'s `translationPath` prop is passed as `""` on the two homepages and as `blog` / `blog/<slug>` on blog pages, enabling `hreflang` alternates; `LanguageSwitcher.astro` special-cases `/blog` and `/en/blog` routes to link to the matching post/listing instead of falling back to the homepage (its documented fallback behavior for every other locale-only route, e.g. `/muj-pohled`).

**Page composition.** `index.astro`/`en/index.astro` assemble `Layout > Header + [Hero, Offerings, About, Testimonials, Process, Contact] + Footer`. Each section component owns an `id` (`#hero`, `#co-nabizim`, `#o-mne`, `#reference`, `#spoluprace`, `#kontakt`) that `Header.astro`'s nav hash-links to — keep these in sync if a section is renamed or reordered.

**CMS (Sveltia).** `public/admin/` is a git-backed visual editor (Sveltia CMS, GitHub backend) for `home.cs.json`/`home.en.json`, served at `/admin`. `public/admin/config.yml` maps CMS fields 1:1 to that JSON's shape — if you rename/add/remove a field in `home.*.json`/`content.ts`, update `config.yml` too or the CMS and site will drift apart. Auth goes through a separate Cloudflare Worker (`sarkaw-cms-auth`), not through this repo. The client edits content directly through this CMS, which commits straight to `main` on GitHub — always `git fetch`/`git pull` before assuming local `main` reflects the live content, and expect to resolve merge conflicts in `home.cs.json`/`home.en.json` when local edits and CMS edits touch the same fields.

**Styling.** Design tokens (colors, fonts, radius, max-width) are CSS custom properties in `:root` in `src/styles/global.css` — per the TODO there, current values are placeholders pending the client's real brand colors/fonts; changing the tokens re-themes the whole site. Everything else is component-scoped `<style>` blocks inside each `.astro` file. The decorative background image is set once on `body` in `global.css` (`background-attachment: fixed`, disabled on mobile for perf) and shows through every section by default since sections have no background of their own. The `Hero` section is the one exception: it layers its own portrait photo (`--hero-image`, `background-size: contain`) on top of the same site background image (`background-size: cover`) using multi-layer `background-*` properties — if you touch `Hero.astro`'s background, keep both layers and the mobile override (which drops both and falls back to an inline `<img>`) in sync.

**Deploy.** This project deploys via **Cloudflare Pages' Git integration**: pushing to `origin/main` triggers an automatic Cloudflare build (`npm run build`, output dir `dist`) and production deployment — no manual step required. This has been the case since 2026-08-05 (project `sarkaw`, account `ddf9621f13a718af2215e27cecd32311`, source `SarkaWilliams/sarkaw`, `production_branch: main`, verified via `GET /accounts/{account_id}/pages/projects/sarkaw`). **`git push` to `main` *is* the deploy step** — do not also run `npm run deploy` (`wrangler pages deploy`) as a routine follow-up; that creates a redundant duplicate deployment of the same commit (`ad_hoc` trigger, alongside the `github:push`-triggered one Cloudflare already made). The project predates this integration — it started as Wrangler direct-upload only (see `prompt-claudecode-git-cloudflare.md` for that original rationale/setup), and the git integration was connected later without the docs being updated to match; direct-upload doc references elsewhere (README, that prompt file) are historical, not current practice.

`npm run deploy` still exists and still works (there is no `wrangler.toml`/`wrangler.jsonc`; the project name is passed inline) — keep it only as a manual/emergency override for deploying uncommitted local changes or a specific non-`main` branch as a Preview, not as part of the normal push workflow. Verify the live deployment's source commit with `npx wrangler pages deployment list --project-name=sarkaw` (or the API) if unsure whether a push actually built and deployed — check the `Source`/commit column against `git log -1`, and note that a legitimate build takes on the order of a minute, so a very recent push may not be live yet.

**Git push caveat.** `git push` to `origin/main` has intermittently failed with a 403 (stored credentials belonging to a GitHub account without write access to `SarkaWilliams/sarkaw`), even though `git fetch`/`pull` and the git author identity work fine. Since a push is now what triggers the Cloudflare deploy, a failed push blocks deployment too — it's not a fallback-and-move-on situation. If push fails, don't treat it as a code problem; flag it so the user can fix the stored GitHub credential, then retry the push.

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
