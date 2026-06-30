"use client";

import { DecorativeImage } from "@/components/layout/decorative-image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";

export function ContactSection() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];

  return (
    <section className="bg-cream py-20 md:py-[80px]">
      <div className="home-scale grid gap-16 px-6 md:grid-cols-[514px_1fr] md:gap-24 md:px-[139px_64px]">
        <Reveal className="relative">
          <div className="relative max-w-[514px]">
            <h2 className="display-title text-ink">
              {dictionary.home.contactTitle}
            </h2>
            <DecorativeImage
              className="spin-slow absolute left-[calc(100%+28px)] top-1/2 hidden h-auto w-[96px] -translate-y-1/2 md:block"
              height={130}
              src="/images/figma/shape-purple.svg"
              width={129}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="flex flex-col gap-6" action="/api/contact" method="post">
            <label className="sr-only" htmlFor="name">
              {dictionary.home.form.name}
            </label>
            <input
              className="h-[72px] rounded-lg bg-[#f3f3f3] px-6 font-work text-base text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="name"
              name="name"
              placeholder={dictionary.home.form.name}
              type="text"
            />
            <label className="sr-only" htmlFor="email">
              {dictionary.home.form.email}
            </label>
            <input
              className="h-[72px] rounded-lg bg-[#f3f3f3] px-6 font-work text-base text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="email"
              name="email"
              placeholder={dictionary.home.form.email}
              type="email"
            />
            <label className="sr-only" htmlFor="message">
              {dictionary.home.form.message}
            </label>
            <textarea
              className="min-h-[192px] resize-y rounded-lg bg-[#f3f3f3] px-6 py-6 font-work text-base leading-6 text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="message"
              name="message"
              placeholder={dictionary.home.form.message}
            />
            <div className="pt-4">
              <Button type="submit">{dictionary.home.form.submit}</Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
