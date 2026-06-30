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
    <header className="sticky top-0 z-50 h-[100px] border-b border-black/5 bg-cream/94 shadow-hairline backdrop-blur-md">
      <div className="home-scale flex h-full items-center justify-between px-6 md:px-16">
        <nav
          aria-label="Principal"
          className="flex items-center gap-4 md:gap-10"
        >
          {navItems.map((item) => (
            <Link
              className="font-sans text-sm leading-7 text-muted transition-colors hover:text-ink md:text-lg"
              href={item.href}
              key={item.href}
            >
              {dictionary.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div
          aria-label={dictionary.nav.languageLabel}
          className="flex items-center gap-3"
          role="group"
        >
          {(["en", "es"] as const).map((item) => (
            <button
              aria-pressed={language === item}
              className="font-sans text-sm leading-7 text-muted transition-colors hover:text-ink aria-pressed:text-ink aria-pressed:underline md:text-lg"
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
