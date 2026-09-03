# sarkaw

Marketing web pro koučku Šárku Williams. Statický Astro web, žádný vlastní server/DB.

## Stack

- **Astro** (bez UI frameworku, `.astro` komponenty)
- **Cloudflare Pages** — napojeno na Git integraci (projekt `sarkaw`, repo `SarkaWilliams/sarkaw`, produkční větev `main`). Každý `git push` na `main` automaticky spustí build (`npm run build`) a nasadí `dist` na produkci — žádný ruční krok navíc.
- **Sveltia CMS** na `/admin` — git-backed editor (GitHub backend), commituje přímo do `main`. Vždy nejdřív `git pull`, ať lokální práce nepřepíše klientčiny úpravy.

## Jazyky (CS/EN)

- CS na `/`, EN na `/en/`.
- Obsah stránky: `src/content/pages/home.cs.json` a `home.en.json`, typováno `HomeContent` v `src/lib/content.ts`.
- UI popisky (nav, nadpisy sekcí, aria labely): `src/lib/i18n.ts`, oddělené od obsahu.
- Blog je jen česky, bez EN protějšku.

## Kontaktní formulář

Sekce Kontakt (`src/components/Contact.astro`) obsahuje formulář napojený na **Web3Forms** (`src/lib/web3forms.ts`) — čistě frontendové řešení, žádný vlastní backend. Access Key je záměrně mimo CMS-spravovaný JSON (Sveltia by ho při uložení mohla smazat, protože není v `config.yml`).

CTA tlačítka ("Napište mi" / "Message Me") v Hero a Spolupráci vedou na `#kontakt`.

## Pozadí webu

`public/1.webp`, nastaveno v `src/styles/global.css` na `body` (`background-attachment: fixed` na desktopu, `scroll` na mobilu).

## Certifikáty (sekce O mně)

Rozdělené na dva seznamy, editovatelné přes CMS, max 5 položek každý:
- **Aktuálně platné** (`aboutBadgesCurrent`)
- **Dříve získané** (`aboutBadgesPast`)

## Vývoj

```
npm install
astro dev --background     # dev server na localhost:4321, na pozadí
astro dev stop|status|logs
```

## Nasazení

Standardní postup je prostě `git push origin main` — Cloudflare Pages má napojenou Git integraci a nasadí to samo (build `npm run build`, výstup `dist`).

`npm run deploy` (`wrangler pages deploy dist --project-name=sarkaw`) pořád funguje jako ruční/nouzová varianta (např. nasazení necommitnutých změn, nebo preview z jiné větve), ale při běžné práci ho nepoužívej navíc po pushi — vytvoří to zbytečný duplicitní deployment stejného commitu.

Ověření, který commit je aktuálně nasazený na produkci: `npx wrangler pages deployment list --project-name=sarkaw` (sloupec Source/Branch).
