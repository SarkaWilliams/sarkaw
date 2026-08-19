export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export function normalizeLocale(locale: string | undefined): Locale {
  return locale === "en" ? "en" : "cs";
}

interface UiStrings {
  htmlLang: string;
  siteTitleSuffix: string;
  defaultDescription: string;
  nav: {
    home: string;
    services: string;
    about: string;
    testimonials: string;
    process: string;
    blog: string;
    contact: string;
  };
  menuToggleLabel: string;
  languageSwitcher: {
    cs: string;
    en: string;
  };
  sections: {
    servicesHeading: string;
    aboutHeading: string;
    credentialsCurrentHeading: string;
    credentialsPastHeading: string;
    aboutPhotoAlt: string;
    testimonialsHeading: string;
    contactHeading: string;
  };
  contactLabels: {
    ico: string;
    email: string;
    phone: string;
  };
  socialAria: {
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  footer: string;
}

export const ui: Record<Locale, UiStrings> = {
  cs: {
    htmlLang: "cs",
    siteTitleSuffix: "Koučink",
    defaultDescription: "Osobní koučink — individuální sezení a konzultace.",
    nav: {
      home: "Úvodní stránka",
      services: "Co nabízím",
      about: "O mně",
      testimonials: "Reference",
      process: "Spolupráce",
      blog: "Blog",
      contact: "Kontakt",
    },
    menuToggleLabel: "Otevřít menu",
    languageSwitcher: {
      cs: "CZ",
      en: "EN",
    },
    sections: {
      servicesHeading: "Co nabízím",
      aboutHeading: "Kdo stojí za vaším rozvojem?",
      credentialsCurrentHeading: "Aktuálně platné:",
      credentialsPastHeading: "Dříve získané:",
      aboutPhotoAlt: "Šárka Williams",
      testimonialsHeading: "Reference",
      contactHeading: "Kontakt",
    },
    contactLabels: {
      ico: "IČO",
      email: "E-mail",
      phone: "Telefon",
    },
    socialAria: {
      linkedin: "LinkedIn profil Šárky Williams",
      facebook: "Facebook profil Šárky Williams",
      instagram: "Instagram profil Šárky Williams",
    },
    footer: "Koučink. Všechna práva vyhrazena.",
  },
  en: {
    htmlLang: "en",
    siteTitleSuffix: "Coaching",
    defaultDescription: "Personal coaching — individual sessions and consultations.",
    nav: {
      home: "Home",
      services: "Services",
      about: "About Me",
      testimonials: "Testimonials",
      process: "Work With Me",
      blog: "Blog",
      contact: "Contact",
    },
    menuToggleLabel: "Open menu",
    languageSwitcher: {
      cs: "CZ",
      en: "EN",
    },
    sections: {
      servicesHeading: "Services",
      aboutHeading: "Who's behind your growth?",
      credentialsCurrentHeading: "Currently valid:",
      credentialsPastHeading: "Previously obtained:",
      aboutPhotoAlt: "Šárka Williams",
      testimonialsHeading: "Testimonials",
      contactHeading: "Contact",
    },
    contactLabels: {
      ico: "Company ID",
      email: "Email",
      phone: "Phone",
    },
    socialAria: {
      linkedin: "LinkedIn profile of Šárka Williams",
      facebook: "Facebook profile of Šárka Williams",
      instagram: "Instagram profile of Šárka Williams",
    },
    footer: "Coaching. All rights reserved.",
  },
};
