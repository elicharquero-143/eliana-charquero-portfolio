"use client";

import Image from "next/image";
import { DecorativeImage } from "@/components/layout/decorative-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import type { CmsTestimonial } from "@/sanity/lib/home-content";

type TestimonialsSectionProps = {
  initialTestimonials?: CmsTestimonial[];
};

export function TestimonialsSection({
  initialTestimonials,
}: TestimonialsSectionProps) {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const fallbackTestimonials = dictionary.testimonials.map((testimonial) => ({
    ...testimonial,
    avatar: "/images/figma/client.png",
  }));
  const cmsTestimonials =
    initialTestimonials?.map((testimonial) => ({
      ...testimonial,
      quote:
        language === "en" && testimonial.quoteEn?.trim()
          ? testimonial.quoteEn
          : testimonial.quote,
      role:
        language === "en" && testimonial.roleEn?.trim()
          ? testimonial.roleEn
          : testimonial.role,
    })) ?? [];
  const testimonials: CmsTestimonial[] =
    cmsTestimonials.length > 0
      ? cmsTestimonials
      : fallbackTestimonials;

  return (
    <section className="relative overflow-hidden bg-periwinkle py-16 md:py-[84px]">
      <div className="home-scale relative">
        <Reveal>
          <h2 className="section-heading relative z-10 text-center text-cream">
            {dictionary.home.testimonialsTitle}
          </h2>
        </Reveal>
        <Stagger className="relative z-10 mx-auto mt-8 grid max-w-[1199px] gap-8 px-6 lg:grid-cols-3 lg:px-0">
          {testimonials.map((testimonial) => (
            <StaggerItem
              className="flex min-h-[292px] flex-col justify-between rounded-xl bg-white p-8 md:p-12"
              key={`${testimonial.name}-${testimonial.company}`}
            >
              <p className="text-pretty font-sans text-lg leading-7 text-[#444748]">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover saturate-0"
                    fill
                    sizes="48px"
                    src={testimonial.avatar ?? "/images/figma/client.png"}
                  />
                </div>
                <div>
                  <p className="text-[10px] leading-[15px] text-yolk">★★★★★</p>
                  <p className="mt-1 font-work text-xs leading-[18px] text-[#1b1c1c]">
                    {testimonial.name}
                  </p>
                  <p className="font-work text-[10px] uppercase leading-[15px] text-[#1b1c1c]/40">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <DecorativeImage
          className="spin-slow pointer-events-none absolute -right-14 top-4 z-0 hidden h-auto w-[160px] opacity-70 md:block lg:-right-8 lg:w-[180px] xl:right-0"
          height={200}
          src="/images/figma/shape-olive.svg"
          width={201}
        />
      </div>
    </section>
  );
}
