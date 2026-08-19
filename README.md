# sarkaw

Marketing web pro koučku Šárku Williams. Statický Astro web, žádný vlastní server/DB.

## Stack

- **Astro** (bez UI frameworku, `.astro` komponenty)
- **Cloudflare Pages** — nasazení přes `wrangler pages deploy dist --project-name=sarkaw` (přímý upload, ne git integrace). `git push` na `main` sám o sobě nic nenasadí.
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

```
npm run deploy              # build + wrangler pages deploy (jen z main = produkce)
```

Ověření, že šlo o produkční deployment: `npx wrangler pages deployment list --project-name=sarkaw`.
