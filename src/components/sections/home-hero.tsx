"use client";

import Image from "next/image";
import Link from "next/link";
import { DecorativeImage } from "@/components/layout/decorative-image";
import { AnimatedTitle } from "@/components/motion/animated-title";
import { MotionImageBlock, Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { routes } from "@/lib/routes";

export function HomeHero() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const repeatedMarquee = `${dictionary.home.marquee} ✹ ${dictionary.home.marquee} ✹ ${dictionary.home.marquee} ✹ ${dictionary.home.marquee} ✹ ${dictionary.home.marquee} ✹ ${dictionary.home.marquee} ✹ `;

  return (
    <section className="relative bg-cream">
      <div className="home-scale relative pb-14 md:min-h-[1166px] md:pb-16">
        <div className="pointer-events-none absolute left-[6%] top-14 z-0 h-[420px] w-[78%] max-w-[720px] md:left-[68px] md:top-[62px]">
          <Image
            alt=""
            aria-hidden
            className="absolute left-0 top-0 h-auto w-[613px] max-w-none opacity-80"
            height={437}
            priority
            src="/images/figma/gradient-1.svg"
            width={613}
          />
          <Image
            alt=""
            aria-hidden
            className="absolute left-[130px] top-[200px] h-auto w-[482px] max-w-none opacity-80"
            height={462}
            priority
            src="/images/figma/gradient-2.svg"
            width={482}
          />
        </div>

        <div className="relative z-10 px-5 pt-14 md:w-[1038px] md:px-16 md:pt-20">
          <AnimatedTitle
            ariaLabel="ELIANA CHARQUERO"
            className="display-title max-w-[680px] text-ink"
            lines={["ELIANA", "CHARQUERO"]}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-5 pt-10 md:min-h-[722px] md:grid-cols-2 md:gap-12 md:px-16 md:pt-0">
          <MotionImageBlock className="relative flex justify-center md:justify-start md:pl-0">
            <DecorativeImage
              className="spin-slow absolute -left-5 -top-10 z-10 h-auto w-[112px] md:-left-14 md:-top-12 md:w-[176px]"
              height={172}
              priority
              src="/images/figma/shape-yellow.svg"
              width={176}
            />
            <div className="relative h-[360px] w-[308px] overflow-hidden rounded-xl opacity-80 mix-blend-luminosity md:h-[498px] md:w-[426px]">
              <Image
                alt="Retrato de Eliana Charquero"
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(min-width: 768px) 426px, 308px"
                src="/images/figma/foto-eli.png"
              />
            </div>
          </MotionImageBlock>

          <Reveal className="max-w-[622px] md:pt-16" delay={0.12}>
            <div className="max-w-[509px] text-ink">
              <p className="font-sans text-2xl font-bold leading-8 md:text-[30px] md:leading-[38px]">
                {dictionary.home.introTitle}
              </p>
              <p className="mt-5 font-sans text-xl font-medium leading-7 md:mt-6 md:text-2xl md:leading-[26px]">
                {dictionary.home.introBody}
              </p>
            </div>
            <Button asChild className="mt-10 h-[51px]">
              <Link href={routes.about}>{dictionary.home.aboutCta}</Link>
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="h-[110px] overflow-hidden bg-periwinkle">
        <div className="marquee-track flex h-full w-max items-center whitespace-nowrap">
          {[0, 1].map((set) => (
            <p
              className="px-0 font-sans text-[30px] font-bold leading-[38px] text-ink"
              key={set}
            >
              {repeatedMarquee}&nbsp;
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
