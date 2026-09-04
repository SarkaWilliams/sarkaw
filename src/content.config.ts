import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Sveltia i18n structure "multiple_files" stores each locale as its own file,
// e.g. src/content/blog/some-post.cs.md + some-post.en.md. The glob loader's
// default id generation runs filenames through github-slugger, which strips
// dots — "some-post.cs.md" would collapse to id "some-postcs", losing the
// locale suffix pages need to filter on. This generateId keeps ".cs"/".en"
// intact as an explicit id suffix instead.
function localeFileId({ entry }: { entry: string }) {
  const match = entry.match(/^(.+)\.(cs|en)\.md$/);
  if (!match) {
    throw new Error(`Expected a "<slug>.cs.md" or "<slug>.en.md" filename, got: ${entry}`);
  }
  const [, slug, locale] = match;
  return `${slug}.${locale}`;
}

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog", generateId: localeFileId }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
  }),
});

const perspectives = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/perspectives", generateId: localeFileId }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    linkedinUrl: z.string().url(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, perspectives };
