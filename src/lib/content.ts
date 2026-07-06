import homeData from "../content/pages/home.json";

export interface Service {
  title: string;
  description: string;
}

export interface Offering {
  title: string;
  intro: string;
  items: string[];
}

export interface Contact {
  email: string;
  phone: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutImage: string;
  about: string;
  services: Service[];
  offerings: Offering[];
  contact: Contact;
  ctaText: string;
  ctaUrl: string;
}

export const home = homeData as HomeContent;
