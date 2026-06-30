import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://elianacharquero.com"),
  title: {
    default: "Eliana Charquero",
    template: "%s | Eliana Charquero",
  },
  description:
    "Portfolio de Eliana Charquero, diseñadora de comunicación visual y UX/UI en Montevideo, Uruguay.",
  openGraph: {
    title: "Eliana Charquero",
    description:
      "Diseño visual, identidad, UX/UI, ilustración y experiencias digitales.",
    siteName: "Eliana Charquero",
    locale: "es_UY",
    type: "website",
  },
};
