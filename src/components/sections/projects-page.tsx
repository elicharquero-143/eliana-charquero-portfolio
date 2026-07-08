"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { localizeProjects } from "@/lib/project-localization";
import type { Project } from "@/types/project";

type ProjectsPageProps = {
  initialProjects?: Project[];
};

export function ProjectsPage({ initialProjects }: ProjectsPageProps) {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const content = dictionary.projectPage;
  const projects =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : (dictionary.projects as readonly Project[]);
  const localizedProjects = localizeProjects(projects, language);

  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <section className="relative bg-cream px-5 pb-14 pt-20 md:px-[68px] md:pb-20 md:pt-[118px]">
        <Image
          alt=""
          aria-hidden
          className="spin-slow pointer-events-none absolute right-[8%] top-24 hidden h-auto w-[142px] md:block"
          height={172}
          src="/images/figma/shape-purple.svg"
          width={176}
        />
        <div className="home-scale">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[820px]">
              <Reveal y={18}>
                <p className="font-sans text-lg leading-7 text-muted">
                  {content.eyebrow}
                </p>
                <h1 className="mt-3 font-serif text-[56px] font-normal leading-[0.92] text-ink sm:text-[76px] md:text-[128px]">
                  {content.title}
                </h1>
              </Reveal>
              <Reveal delay={0.08} y={18}>
                <p className="mt-6 max-w-[620px] text-pretty font-sans text-lg leading-7 text-ink">
                  {content.intro}
                </p>
              </Reveal>
            </div>
            <Reveal className="flex items-center gap-3 font-sans text-sm font-bold uppercase tracking-[0.14em] text-muted" delay={0.14}>
              <span>{content.scrollHint}</span>
              <ArrowRight aria-hidden className="size-5" />
            </Reveal>
          </div>

          <Stagger className="mt-10 flex snap-x gap-4 overflow-x-auto pb-8 [scrollbar-width:thin] md:mt-12 md:gap-6">
            {localizedProjects.map((project) => (
              <StaggerItem
                className="min-w-[84vw] snap-start sm:min-w-[560px] lg:min-w-[680px]"
                key={project.slug}
              >
                <ProjectCard
                  ctaLabel={content.viewProject}
                  project={project}
                  variant="carousel"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
