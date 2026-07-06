# Prompt: propojení Claude Code + Git + Cloudflare (Astro statický web)

Stack: **Astro 5 (statický výstup) → GitHub (verzování) → Cloudflare Pages přes Direct Upload (wrangler), bez Git integrace Cloudflare.**

---

## ČÁST 1 — Co uděláš jednou ručně (Claude Code to za tebe neproklikne)

1. Mít účet na **GitHubu** a **Cloudflare** (oba zdarma).
2. Nainstalováno: **Node.js (LTS)**, **Git**, **gh** (GitHub CLI), **Claude Code**.
3. Přihlášení k službám — interaktivní (otevře prohlížeč), proto to nejde plně automatizovat:
   - **Cloudflare:** buď `npx wrangler login` (OAuth — nejjednodušší pro tvůj vlastní účet),
     nebo (doporučeno pro klientské projekty) vytvoř **scoped API token** s minimálními právy
     (jen Pages\:Edit + případně DNS pro danou zónu), ne účtové master heslo.
   - **GitHub:** `gh auth login`.

> Tip: pro tvůj vlastní web klidně použij `wrangler login`. Pro klienta scoped token —
> když token unikne nebo se něco pokazí, škoda je ohraničená.

---

## ČÁST 2 — Prompt, který vložíš do Claude Code

Zkopíruj vše níže (mezi čarami) do Claude Code:

---

Jsi můj asistent pro nastavení a nasazení statického webu. Stack: **Astro 5 (statický výstup)**, verzování na **GitHubu**, nasazení na **Cloudflare Pages přes Direct Upload (wrangler)**, bez Git integrace Cloudflare.

Pracuj **po krocích** a po každém kroku mi stručně řekni, co jsi udělal. U kroků, které vyžadují přihlášení v prohlížeči (OAuth), se **zastav a počkej**, až ti potvrdím, že jsem to dokončil.

**Bezpečnostní pravidla (dodržuj vždy):**
- Nikdy necommituj tajemství. Zajisti, že `.gitignore` obsahuje: `node_modules/`, `dist/`, `.env`, `.dev.vars`, `.wrangler/`.
- Tajné hodnoty (API klíče apod.) nastavuj přes `wrangler pages secret put`, nikdy do souborů v repu.
- Před **každou nevratnou nebo produkční akcí** (mazání, deploy na produkci, změna DNS, force push) se mě nejdřív zeptej a počkej na potvrzení.
- Používej jen přístupy, které už mám nastavené. Nezakládej nové účty ani nové tokeny.

**Kroky:**

1. **Ověř prostředí.** Vypiš verze: `node --version`, `npm --version`, `git --version`, `gh --version`, `npx wrangler --version`. Pokud něco chybí, řekni mi co a jak to doinstalovat — neinstaluj systémové věci sám.

2. **Přihlášení.**
   - Spusť `npx wrangler login`. Otevře se prohlížeč — počkej, až ti potvrdím dokončení. Pak ověř `npx wrangler whoami`.
   - Ověř GitHub: `gh auth status`. Pokud nejsem přihlášen, řekni mi spustit `gh auth login` a počkej.

3. **Projekt.** Pokud v aktuální složce ještě není Astro projekt, založ minimální statický web (`npm create astro@latest`, šablonu "Empty" nebo "Minimal", bez TypeScriptu pokud se zeptá). Pokud projekt existuje, použij ho.

4. **Git.** Inicializuj repozitář (pokud chybí), vytvoř/uprav `.gitignore` podle pravidel výše a udělej první commit s rozumnou zprávou.

5. **GitHub.** Navrhni název repozitáře podle složky a nech mě ho potvrdit. Pak vytvoř **PRIVÁTNÍ** repozitář a pushni: `gh repo create <NÁZEV> --private --source=. --push`.

6. **Build.** Spusť `npm run build` a ověř, že vznikla složka `dist/`.

7. **Nasazení (preview).** Nasaď na Cloudflare Pages: `npx wrangler pages deploy dist --project-name=<NÁZEV>`. Při prvním běhu tě to může vyzvat k zadání názvu projektu a produkční větve — použij `<NÁZEV>` a `main`. Vrať mi výslednou `*.pages.dev` URL. **Toto je vývojová/náhledová verze, NE produkce.**

8. **Zjednoduš workflow.** Přidej do `package.json` skript:
   `"deploy": "npm run build && wrangler pages deploy dist --project-name=<NÁZEV>"`
   ať příště stačí `npm run deploy`.

**Zatím NENASAZUJ na vlastní doménu a NEMĚŇ žádné DNS** — to uděláme zvlášť, až bude tohle fungovat.

---

## ČÁST 3 — Volitelně, pro pozdější práci s doménou a DNS

Až budeš chtít napojovat produkční doménu / DNS bez klikání v dashboardu, můžeš v Claude Code
jednorázově nainstalovat **oficiální Cloudflare plugin** (Skills + MCP server). Cloudflare k tomu
má návod na `developers.cloudflare.com/agent-setup/claude-code/`. Pak Claude Code zvládne i DNS
a custom doménu přes Cloudflare API (připojení domény k Pages totiž zatím není přímo ve `wrangler` CLI).
