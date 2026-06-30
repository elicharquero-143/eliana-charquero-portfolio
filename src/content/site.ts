import { routes } from "@/lib/routes";

export const siteSettings = {
  name: "Eliana Charquero",
  description:
    "Diseñadora de comunicación visual y UX/UI. Experiencias digitales y visuales con creatividad, estrategia y diseño.",
  email: "elicharquero@gmail.com",
  copyright: "© 2026 Eliana Charquero. Diseñado en Montevideo, Uruguay.",
  socialLinks: [
    { label: "Email", href: "mailto:elicharquero@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/elianacharquero/" },
    { label: "Behance", href: "https://www.behance.net/elicharquero" },
  ],
  languages: [
    { label: "ING", href: routes.home },
    { label: "ESP", href: routes.home },
  ],
} as const;
