"use client";

import Link from "next/link";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";

export function SiteFooter() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];

  return (
    <footer className="bg-ink text-cream">
      <div className="home-scale flex min-h-[176px] flex-col justify-center gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-16 md:py-12">
        <div>
          <p className="font-sans text-2xl font-medium leading-[26px]">
            {dictionary.site.name}
          </p>
          <p className="mt-3 font-sans text-sm leading-7 md:text-lg">
            {dictionary.site.copyright}
          </p>
        </div>
        <nav aria-label="Social" className="flex flex-wrap gap-8">
          {dictionary.site.socialLinks.map((link) => (
            <Link
              className="font-sans text-lg leading-7 transition-opacity hover:opacity-70"
              href={link.href}
              key={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
