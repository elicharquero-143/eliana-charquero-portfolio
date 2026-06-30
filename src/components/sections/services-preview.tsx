"use client";

import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";

export function ServicesPreview() {
  const { language } = useLanguage();
  const servicesPreview = dictionaries[language].services;

  return (
    <section className="bg-cream py-14 md:py-[48px]">
      <div className="home-scale px-6 md:px-[112px] lg:px-[147px]">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesPreview.map((service) => (
            <StaggerItem
              className="flex min-h-[300px] flex-col items-center rounded-2xl border border-transparent px-6 py-8 text-center"
              key={service.slug}
            >
              <Image
                alt=""
                aria-hidden
                className="h-[63px] w-[63px] object-contain"
                height={63}
                src={service.icon}
                width={63}
              />
              <h2 className="mt-8 max-w-[240px] text-pretty font-sans text-[30px] font-bold leading-[38px] text-ink">
                {service.title}
              </h2>
              <p className="mt-4 max-w-[230px] text-pretty font-sans text-lg leading-7 text-muted">
                {service.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
