import homeData from "../content/pages/home.json";

export interface Service {
  title: string;
  description: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  services: Service[];
  ctaText: string;
  ctaUrl: string;
}

export const home = homeData as HomeContent;
