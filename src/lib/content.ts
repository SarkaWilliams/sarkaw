import homeCs from "../content/pages/home.cs.json";
import homeEn from "../content/pages/home.en.json";
import type { Locale } from "./i18n";

export interface Service {
  title: string;
  description: string;
}

export interface PricingItem {
  label: string;
  price: string;
}

export interface Offering {
  title: string;
  quote?: string;
  intro: string;
  itemsHeading?: string;
  items: string[];
  pricing: PricingItem[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Process {
  title: string;
  steps: ProcessStep[];
  ctaText: string;
  tagline: string;
}

export interface Contact {
  name: string;
  ico: string;
  address: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroQuote: string;
  heroImage: string;
  aboutImage: string;
  about: string;
  aboutCredentials: string[];
  services: Service[];
  offerings: Offering[];
  process: Process;
  testimonials: Testimonial[];
  contact: Contact;
  ctaText: string;
  ctaUrl: string;
}

const homeByLocale: Record<Locale, HomeContent> = {
  cs: homeCs as HomeContent,
  en: homeEn as HomeContent,
};

export function getHomeContent(locale: Locale): HomeContent {
  return homeByLocale[locale];
}
