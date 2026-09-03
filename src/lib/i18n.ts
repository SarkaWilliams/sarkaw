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
    perspectives: string;
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
  contactForm: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitLabel: string;
    sendingLabel: string;
    errorMessage: string;
  };
  socialAria: {
    linkedin: string;
    instagram: string;
  };
  footer: string;
  legal: {
    privacyLinkLabel: string;
    privacyHref: string;
  };
  perspectives: {
    heading: string;
    intro: string;
    readOnLinkedin: string;
    empty: string;
  };
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
      blog: "Praktické tipy",
      perspectives: "Můj pohled",
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
    contactForm: {
      nameLabel: "Jméno",
      emailLabel: "E-mail",
      phoneLabel: "Telefon (nepovinné)",
      messageLabel: "Zpráva",
      submitLabel: "Odeslat zprávu",
      sendingLabel: "Odesílám…",
      errorMessage: "Něco se pokazilo. Zkuste to prosím znovu, nebo mi napište přímo na e-mail.",
    },
    socialAria: {
      linkedin: "LinkedIn profil Šárky Williams",
      instagram: "Instagram profil Šárky Williams",
    },
    footer: "Koučink. Všechna práva vyhrazena.",
    legal: {
      privacyLinkLabel: "Ochrana osobních údajů",
      privacyHref: "/ochrana-osobnich-udaju",
    },
    perspectives: {
      heading: "Můj pohled",
      intro: "Články a úvahy, které sdílím na LinkedInu.",
      readOnLinkedin: "Číst na LinkedIn →",
      empty: "Zatím tu nejsou žádné příspěvky. Brzy se to změní.",
    },
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
      blog: "Practical Tips",
      perspectives: "My Perspective",
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
    contactForm: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone (optional)",
      messageLabel: "Message",
      submitLabel: "Send Message",
      sendingLabel: "Sending…",
      errorMessage: "Something went wrong. Please try again, or email me directly.",
    },
    socialAria: {
      linkedin: "LinkedIn profile of Šárka Williams",
      instagram: "Instagram profile of Šárka Williams",
    },
    footer: "Coaching. All rights reserved.",
    legal: {
      privacyLinkLabel: "Privacy Policy",
      privacyHref: "/en/privacy-policy",
    },
    perspectives: {
      heading: "My Perspective",
      intro: "Articles and reflections I share on LinkedIn.",
      readOnLinkedin: "Read on LinkedIn →",
      empty: "No posts yet — check back soon.",
    },
  },
};
