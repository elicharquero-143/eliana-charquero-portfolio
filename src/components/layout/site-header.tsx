"use client";

import Link from "next/link";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage, type Language } from "@/i18n/language-provider";
import { routes } from "@/lib/routes";

const navItems = [
  { key: "home", href: routes.home },
  { key: "about", href: routes.about },
  { key: "work", href: routes.projects },
  { key: "contact", href: `${routes.services}#wizard` },
] as const;

export function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const dictionary = dictionaries[language];

  return (
    <header className="sticky top-0 z-50 min-h-[76px] border-b border-black/5 bg-cream/94 py-3 shadow-hairline backdrop-blur-md md:h-[100px] md:py-0">
      <div className="home-scale flex h-full flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:justify-between md:px-16">
        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-10"
        >
          {navItems.map((item) => (
            <Link
              className="font-sans text-[13px] leading-6 text-muted transition-colors hover:text-ink md:text-lg md:leading-7"
              href={item.href}
              key={item.href}
            >
              {dictionary.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div
          aria-label={dictionary.nav.languageLabel}
          className="flex shrink-0 items-center gap-3"
          role="group"
        >
          {(["en", "es"] as const).map((item) => (
            <button
              aria-pressed={language === item}
              className="font-sans text-[13px] leading-6 text-muted transition-colors hover:text-ink aria-pressed:text-ink aria-pressed:underline md:text-lg md:leading-7"
              key={item}
              onClick={() => setLanguage(item as Language)}
              type="button"
            >
              {item === "en" ? dictionary.nav.english : dictionary.nav.spanish}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
