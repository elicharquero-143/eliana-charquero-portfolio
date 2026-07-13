"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionImageBlock, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { localizeProject } from "@/lib/project-localization";
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
  const lightboxLabels =
    language === "en"
      ? {
          close: "Close image",
          next: "Next image",
          previous: "Previous image",
          view: "View image fullscreen",
        }
      : {
          close: "Cerrar imagen",
          next: "Imagen siguiente",
          previous: "Imagen anterior",
          view: "Ver imagen en pantalla completa",
        };
  const projects = dictionary.projects as readonly Project[];
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const sourceProject = initialProject ?? projects[projectIndex];
  const project = sourceProject ? localizeProject(sourceProject, language) : null;
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const galleryImages = project?.gallery.length ? project.gallery : [];
  const activeGalleryImage =
    activeGalleryIndex === null ? null : galleryImages[activeGalleryIndex];

  const closeLightbox = useCallback(() => {
    setActiveGalleryIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveGalleryIndex((current) =>
      current === null
        ? current
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const showNextImage = useCallback(() => {
    setActiveGalleryIndex((current) =>
      current === null ? current : (current + 1) % galleryImages.length,
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (activeGalleryIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft" && galleryImages.length > 1) {
        showPreviousImage();
      }

      if (event.key === "ArrowRight" && galleryImages.length > 1) {
        showNextImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeGalleryIndex,
    closeLightbox,
    galleryImages.length,
    showNextImage,
    showPreviousImage,
  ]);

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
  const detailTags = [
    project.role,
    project.category.title,
    project.year,
    ...project.tools,
  ].filter((item, index, list) => item && list.indexOf(item) === index);
  const externalLinks =
    project.externalLinks?.filter((link) => link.href && link.label) ?? [];

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

            {externalLinks.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {externalLinks.map((link) => (
                  <Button
                    asChild
                    className="h-12"
                    key={`${link.label}-${link.href}`}
                    variant="secondary"
                  >
                    <a href={link.href} rel="noreferrer" target="_blank">
                      {link.label}
                      <ExternalLink aria-hidden className="ml-2 size-4" />
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {galleryImages.length > 0 ? (
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
                  <button
                    aria-label={`${lightboxLabels.view}: ${project.title} ${index + 1}`}
                    className="group h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    onClick={() => setActiveGalleryIndex(index)}
                    type="button"
                  >
                    <Image
                      alt={`${project.title} ${index + 1}`}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={image}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {activeGalleryImage ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 px-4 py-16 backdrop-blur-md md:px-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          role="dialog"
        >
          <button
            aria-label={lightboxLabels.close}
            className="absolute right-5 top-5 z-20 grid size-12 place-items-center rounded-full border-2 border-cream bg-ink text-cream shadow-soft transition-colors hover:bg-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream md:right-10 md:top-10"
            onClick={closeLightbox}
            type="button"
          >
            <X aria-hidden className="size-6" />
            <span className="sr-only">{lightboxLabels.close}</span>
          </button>

          {galleryImages.length > 1 ? (
            <button
              aria-label={lightboxLabels.previous}
              className="absolute left-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:left-8"
              onClick={showPreviousImage}
              type="button"
            >
              <ChevronLeft aria-hidden className="size-7" />
            </button>
          ) : null}

          <div className="relative h-full max-h-[88vh] w-full max-w-[1280px]">
            <Image
              alt={`${project.title} ${(activeGalleryIndex ?? 0) + 1}`}
              className="object-contain"
              fill
              onClick={(event) => event.stopPropagation()}
              priority
              sizes="100vw"
              src={activeGalleryImage}
            />
          </div>

          {galleryImages.length > 1 ? (
            <button
              aria-label={lightboxLabels.next}
              className="absolute right-4 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-8"
              onClick={showNextImage}
              type="button"
            >
              <ChevronRight aria-hidden className="size-7" />
            </button>
          ) : null}
        </div>
      ) : null}
      <SiteFooter />
    </main>
  );
}
