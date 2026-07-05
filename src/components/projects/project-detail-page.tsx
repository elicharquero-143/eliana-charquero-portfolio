"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionImageBlock, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { routes } from "@/lib/routes";
import type { Project } from "@/types/project";

type ProjectDetailPageProps = {
  initialProject?: Project | null;
  slug: string;
};

export function ProjectDetailPage({ initialProject, slug }: ProjectDetailPageProps) {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const content = dictionary.projectPage;
  const projects = dictionary.projects as readonly Project[];
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = initialProject ?? projects[projectIndex];

  if (!project) {
    return (
      <main className="min-h-screen bg-cream">
        <SiteHeader />
        <section className="home-scale px-6 py-28 md:px-[68px]">
          <p className="font-sans text-lg leading-7 text-muted">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-[64px] leading-[0.95] text-ink md:text-[96px]">
            {content.notFoundTitle}
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-7 text-muted">
            {content.notFoundBody}
          </p>
          <Button asChild className="mt-8">
            <Link href={routes.projects}>{content.backToProjects}</Link>
          </Button>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const heroImage = project.heroImage ?? project.coverImage;
  const galleryImages = [heroImage, ...project.gallery, project.coverImage].filter(
    (image, index, list) => list.indexOf(image) === index,
  );
  const detailTags = [
    project.role,
    project.category.title,
    project.year,
    ...project.tools,
  ].filter((item, index, list) => item && list.indexOf(item) === index);

  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <section className="bg-periwinkle px-5 py-16 md:px-[68px] md:py-[96px]">
        <div className="home-scale grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-start">
          <MotionImageBlock className="relative aspect-[1.28] overflow-hidden rounded-xl bg-cream/40">
            <Image
              alt={project.title}
              className="h-full w-full object-contain"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={heroImage}
            />
          </MotionImageBlock>

          <Reveal>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-12" variant="primary">
                <Link href={routes.projects}>
                  <ArrowLeft aria-hidden className="mr-2 size-4" />
                  {content.backToProjects}
                </Link>
              </Button>
              {project.externalLinks?.map((link) => (
                <Button asChild className="h-12" key={link.href} variant="secondary">
                  <a href={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                    <ExternalLink aria-hidden className="ml-2 size-4" />
                  </a>
                </Button>
              ))}
            </div>

            <h1 className="mt-8 font-serif text-[52px] font-normal leading-[0.95] text-ink sm:text-[64px] md:text-[88px]">
              {project.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {detailTags.map((item) => (
                <span
                  className="rounded-full border border-ink/20 bg-cream/50 px-4 py-2 font-mono text-sm text-ink/75"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-[760px] text-pretty font-sans text-lg leading-8 text-ink">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-5 py-16 md:px-[68px] md:py-[96px]">
        <div className="home-scale">
          <Reveal>
            <h2 className="font-sans text-[30px] font-bold leading-[38px] text-ink">
              {content.galleryTitle}
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-2">
            {galleryImages.map((image, index) => (
              <StaggerItem
                className="relative aspect-[1.35] overflow-hidden rounded-xl bg-white"
                key={`${image}-${index}`}
              >
                <Image
                  alt={`${project.title} ${index + 1}`}
                className="h-full w-full object-contain"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={image}
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
