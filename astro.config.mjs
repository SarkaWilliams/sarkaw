// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://sarkawilliams.cz';

// Routes that exist but are intentionally hidden from navigation (empty/pending content) —
// keep these out of the sitemap alongside their `noindex` meta tag.
const sitemapExcludedPaths = ['/muj-pohled/', '/en/my-perspective/'];

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: {
          cs: 'cs-CZ',
          en: 'en-US',
        },
      },
      filter: (page) => !sitemapExcludedPaths.includes(new URL(page).pathname),
    }),
  ],
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
