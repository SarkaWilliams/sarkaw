import homeCs from "../content/pages/home.cs.json";
import homeEn from "../content/pages/home.en.json";
import privacyCs from "../content/pages/privacy.cs.json";
import privacyEn from "../content/pages/privacy.en.json";
import type { Locale } from "./i18n";

export interface Service {
  title: string;
  description: string;
}

export interface Offering {
  title: string;
  quote?: string;
  intro: string;
  itemsHeading?: string;
  items: string[];
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
  instagramUrl: string;
  formHeading: string;
  formSuccessMessage: string;
}

export interface Pricing {
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface AboutBadge {
  image: string;
  alt: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroQuote: string;
  heroImage: string;
  aboutImage: string;
  about: string;
  aboutBadgesCurrent: AboutBadge[];
  aboutBadgesPast: AboutBadge[];
  services: Service[];
  offerings: Offering[];
  process: Process;
  testimonials: Testimonial[];
  contact: Contact;
  pricing: Pricing;
  ctaText: string;
}

const homeByLocale: Record<Locale, HomeContent> = {
  cs: homeCs as HomeContent,
  en: homeEn as HomeContent,
};

export function getHomeContent(locale: Locale): HomeContent {
  return homeByLocale[locale];
}

export interface PrivacySection {
  heading: string;
  text: string;
  items?: string[];
  textAfter?: string;
}

export interface PrivacyContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
}

const privacyByLocale: Record<Locale, PrivacyContent> = {
  cs: privacyCs as PrivacyContent,
  en: privacyEn as PrivacyContent,
};

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return privacyByLocale[locale];
}
