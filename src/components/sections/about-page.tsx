"use client";

import Image from "next/image";
import Link from "next/link";
import { DecorativeImage } from "@/components/layout/decorative-image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function AboutPage() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const about = dictionary.about;

  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <section className="relative bg-cream">
        <div className="home-scale relative px-6 pb-14 pt-20 md:min-h-[787px] md:px-[138px] md:pb-[180px] md:pt-[220px]">
          <div className="pointer-events-none absolute right-0 top-6 h-[660px] w-[72%] max-w-[760px] md:right-[58px] md:top-[30px]">
            <Image
              alt=""
              aria-hidden
              className="absolute left-[22%] top-[190px] h-auto w-[482px] max-w-none opacity-80"
              height={462}
              priority
              src="/images/figma/about/gradient-2.svg"
              width={482}
            />
            <Image
              alt=""
              aria-hidden
              className="absolute left-0 top-0 h-auto w-[613px] max-w-none opacity-80"
              height={437}
              priority
              src="/images/figma/about/gradient-1.svg"
              width={613}
            />
          </div>
          <DecorativeImage
            className="spin-slow absolute right-[24%] top-[118px] hidden h-auto w-[150px] md:block"
            height={200}
            priority
            src="/images/figma/about/shape-olive-about.svg"
            width={201}
          />
          <Reveal className="relative z-10 max-w-[662px]" y={18}>
            <p className="font-sans text-lg leading-7 text-muted">
              {about.eyebrow}
            </p>
            <h1 className="display-title mt-3 text-ink">{about.title}</h1>
            <p className="mt-5 max-w-[536px] text-pretty font-sans text-lg leading-7 text-ink">
              {about.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-periwinkle px-6 py-20 md:px-[138px] md:py-[120px]">
        <div className="home-scale grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,464px)] lg:gap-[120px]">
          <Reveal>
            <h2 className="font-sans text-[30px] font-bold leading-[38px] text-ink">
              {about.missionTitle}
            </h2>
            <div className="mt-8 max-w-[650px] space-y-6 font-sans text-lg leading-7">
              <p className="text-ink">{about.missionParagraphs[0]}</p>
              <p className="text-muted">{about.missionParagraphs[1]}</p>
            </div>
            <DecorativeImage
              className="float-soft mt-10 h-auto w-[132px] md:w-[176px]"
              height={172}
              src="/images/figma/about/shape-yellow-about.svg"
              width={176}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-sans text-[30px] font-bold leading-[38px] text-[#424844]/80">
              {about.areasTitle}
            </h2>
            <Stagger className="mt-8 grid gap-6">
              {about.areas.map((area) => (
                <StaggerItem
                  className="rounded-xl border border-sage/30 bg-cream p-6"
                  key={area.title}
                >
                  <Image
                    alt=""
                    aria-hidden
                    className="h-6 w-6 object-contain"
                    height={25}
                    src={area.icon}
                    width={25}
                  />
                  <h3 className="mt-4 font-serif text-2xl font-bold leading-[38px] text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-1 text-pretty font-sans text-xs font-medium leading-[18px] text-ink">
                    {area.description}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 md:px-[142px] md:py-[86px]">
        <div className="home-scale grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(320px,4fr)] lg:gap-20">
          <Reveal>
            <h2 className="font-sans text-[30px] font-bold leading-[38px] text-ink">
              {about.academicTitle}
            </h2>
            <div className="mt-12 border-l border-sage/50 pl-8">
              {about.academic.map((item, index) => (
                <article className="relative pb-12 last:pb-0" key={item.title}>
                  <span
                    className={cn(
                      "absolute -left-[41px] top-1 size-4 rounded-full border-4 border-cream",
                      "current" in item && item.current
                        ? "bg-[#243c2f]"
                        : "bg-sage",
                    )}
                  />
                  <p
                    className={cn(
                      "font-sans text-sm font-bold leading-[18px]",
                      index === 0 ? "text-[#2d3c00]" : "text-[#727973]",
                    )}
                  >
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold leading-[38px] text-[#243c2f]">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[646px] text-pretty font-sans text-lg leading-7 text-[#424844]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans text-[30px] font-bold leading-[38px] text-[#424844]/80">
              {about.toolkitTitle}
            </h2>
            <div className="mt-12 flex flex-wrap gap-4">
              {about.toolkit.map((tool) => (
                <span
                  className="rounded-full border border-[#e5d2ff]/20 bg-[#e5d2ff]/30 px-5 py-3 font-sans text-sm font-bold leading-[18px] text-[#67587e]"
                  key={tool}
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="relative mt-12 overflow-hidden rounded-xl bg-ink px-8 py-10 text-white">
              <div className="absolute -right-10 -top-10 size-36 rounded-full bg-white/10 blur-[20px]" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-bold leading-[38px]">
                  {about.ctaTitle}
                </h3>
                <p className="mt-4 max-w-[260px] font-sans text-xs font-medium leading-[18px] text-white/80">
                  {about.ctaBody}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    alt=""
                    aria-hidden
                    height={16}
                    src="/images/figma/about/icon-arrow.svg"
                    width={16}
                  />
                  <Button asChild className="border-2 border-white" variant="primary">
                    <Link href={`${routes.services}#wizard`}>{about.ctaButton}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
