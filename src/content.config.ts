import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
  }),
});

// Sveltia i18n structure "multiple_files" stores each locale as its own file,
// e.g. src/content/perspectives/some-post.cs.md + some-post.en.md — the
// locale is a suffix on the entry id (split off in the pages that query this).
const perspectives = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/perspectives" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    linkedinUrl: z.string().url(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, perspectives };
