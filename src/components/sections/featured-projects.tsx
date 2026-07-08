"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { localizeProjects } from "@/lib/project-localization";
import { routes } from "@/lib/routes";
import type { Project } from "@/types/project";

type FeaturedProjectsProps = {
  initialProjects?: Project[];
};

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps) {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const projects =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : (dictionary.projects as readonly Project[]);
  const localizedProjects = localizeProjects(projects, language);

  return (
    <section className="bg-lavender py-16 md:py-[60px]">
      <div className="home-scale flex min-h-[582px] flex-col items-center px-6">
        <Reveal>
          <h2 className="section-heading text-center text-white">
          {dictionary.home.featuredTitle}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid w-full max-w-[1160px] gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {localizedProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} variant="static" />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.08}>
          <Button asChild className="mt-10" variant="secondary">
            <Link href={routes.projects}>{dictionary.home.projectsCta}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
