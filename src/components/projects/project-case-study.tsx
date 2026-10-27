"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type {
  ProjectCaseStudy,
  ProjectResultItem,
  ProjectStoryBlock,
  ProjectStoryMedia,
  ProjectStorySection,
} from "@/types/project";

type CaseStudyLabels = {
  decisionsTitle: string;
  expectedImpactTitle: string;
  learningsTitle: string;
  limitationTitle: string;
  measuredResultsTitle: string;
  problemTitle: string;
  researchTitle: string;
  resultsTitle: string;
  solutionTitle: string;
  viewImage: string;
};

type ProjectCaseStudyContentProps = {
  caseStudy: ProjectCaseStudy;
  labels: CaseStudyLabels;
  onOpenImage: (url: string) => void;
  projectTitle: string;
};

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function hasMedia(media?: ProjectStoryMedia[]) {
  return Boolean(media?.some((item) => item.url));
}

function hasBlocks(blocks?: ProjectStoryBlock[]) {
  return Boolean(
    blocks?.some(
      (block) => hasText(block.title) || hasText(block.body) || hasMedia(block.media),
    ),
  );
}

function hasSection(section?: ProjectStorySection) {
  return Boolean(
    section &&
      (hasText(section.intro) || hasMedia(section.media) || hasBlocks(section.blocks)),
  );
}

function hasResults(items?: ProjectResultItem[]) {
  return Boolean(items?.some((item) => hasText(item.text)));
}

export function hasCaseStudyContent(caseStudy?: ProjectCaseStudy) {
  return Boolean(
    caseStudy?.enabled &&
      (hasText(caseStudy.context) ||
        hasText(caseStudy.status) ||
        hasSection(caseStudy.problem) ||
        hasSection(caseStudy.research) ||
        hasSection(caseStudy.decisions) ||
        hasSection(caseStudy.solution) ||
        hasResults(caseStudy.measuredResults) ||
        hasResults(caseStudy.expectedImpact) ||
        hasResults(caseStudy.learnings) ||
        hasText(caseStudy.limitation)),
  );
}

export function getCaseStudyImages(caseStudy?: ProjectCaseStudy) {
  if (!caseStudy) {
    return [];
  }

  const sectionImages = (section?: ProjectStorySection) => [
    ...(section?.media ?? []),
    ...(section?.blocks?.flatMap((block) => block.media ?? []) ?? []),
  ];

  return [
    ...sectionImages(caseStudy.problem),
    ...sectionImages(caseStudy.research),
    ...sectionImages(caseStudy.decisions),
    ...sectionImages(caseStudy.solution),
  ].filter((item) => item.url);
}

function StoryMediaGrid({
  media,
  onOpenImage,
  projectTitle,
  viewImage,
}: {
  media?: ProjectStoryMedia[];
  onOpenImage: (url: string) => void;
  projectTitle: string;
  viewImage: string;
}) {
  const images = media?.filter((item) => item.url) ?? [];

  if (images.length === 0) {
    return null;
  }

  return (
    <Stagger className={`grid gap-5 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((item, index) => (
        <StaggerItem key={item._key ?? `${item.url}-${index}`}>
          <figure>
            <button
              aria-label={`${viewImage}: ${item.alt || projectTitle}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              onClick={() => onOpenImage(item.url)}
              type="button"
            >
              <Image
                alt={item.alt || projectTitle}
                className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                height={item.height ?? 1200}
                sizes="(min-width: 1024px) 52vw, 100vw"
                src={item.url}
                width={item.width ?? 1600}
              />
            </button>
            {hasText(item.caption) ? (
              <figcaption className="mt-3 max-w-[720px] font-sans text-sm leading-6 text-muted">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <p className="font-mono text-sm font-bold uppercase text-plum">{index}</p>
      <h2 className="mt-3 max-w-[420px] font-serif text-[44px] font-normal leading-[0.98] text-ink sm:text-[56px]">
        {title}
      </h2>
    </div>
  );
}

function StoryBlocks({
  blocks,
  onOpenImage,
  projectTitle,
  viewImage,
}: {
  blocks?: ProjectStoryBlock[];
  onOpenImage: (url: string) => void;
  projectTitle: string;
  viewImage: string;
}) {
  const visibleBlocks =
    blocks?.filter(
      (block) => hasText(block.title) || hasText(block.body) || hasMedia(block.media),
    ) ?? [];

  if (visibleBlocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-14 md:space-y-20">
      {visibleBlocks.map((block, index) => (
        <article
          className="border-t border-ink/15 pt-7"
          key={block._key ?? `${block.title}-${index}`}
        >
          <div className="grid gap-6 md:grid-cols-[72px_minmax(0,1fr)]">
            <p className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              {hasText(block.title) ? (
                <h3 className="font-sans text-2xl font-bold leading-tight text-ink md:text-[30px]">
                  {block.title}
                </h3>
              ) : null}
              {hasText(block.body) ? (
                <p className="mt-4 max-w-[760px] whitespace-pre-line text-pretty font-sans text-lg leading-8 text-ink/85">
                  {block.body}
                </p>
              ) : null}
            </div>
          </div>
          {hasMedia(block.media) ? (
            <div className="mt-7 md:ml-[96px]">
              <StoryMediaGrid
                media={block.media}
                onOpenImage={onOpenImage}
                projectTitle={projectTitle}
                viewImage={viewImage}
              />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function NarrativeSection({
  background,
  index,
  labels,
  onOpenImage,
  projectTitle,
  section,
  title,
}: {
  background: string;
  index: string;
  labels: CaseStudyLabels;
  onOpenImage: (url: string) => void;
  projectTitle: string;
  section?: ProjectStorySection;
  title: string;
}) {
  if (!hasSection(section)) {
    return null;
  }

  return (
    <section className={`${background} px-5 py-16 md:px-[68px] md:py-[96px]`}>
      <div className="home-scale grid gap-10 lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
        <Reveal>
          <SectionHeading index={index} title={title} />
        </Reveal>
        <div>
          {hasText(section?.intro) ? (
            <Reveal>
              <p className="max-w-[820px] whitespace-pre-line text-pretty font-sans text-xl leading-9 text-ink md:text-2xl md:leading-10">
                {section?.intro}
              </p>
            </Reveal>
          ) : null}
          {hasMedia(section?.media) ? (
            <div className="mt-8">
              <StoryMediaGrid
                media={section?.media}
                onOpenImage={onOpenImage}
                projectTitle={projectTitle}
                viewImage={labels.viewImage}
              />
            </div>
          ) : null}
          {hasBlocks(section?.blocks) ? (
            <div className={hasText(section?.intro) || hasMedia(section?.media) ? "mt-12" : ""}>
              <StoryBlocks
                blocks={section?.blocks}
                onOpenImage={onOpenImage}
                projectTitle={projectTitle}
                viewImage={labels.viewImage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ResultList({
  items,
  title,
}: {
  items?: ProjectResultItem[];
  title: string;
}) {
  const visibleItems = items?.filter((item) => hasText(item.text)) ?? [];

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-ink/15 pt-6">
      <h3 className="font-sans text-xl font-bold text-ink">{title}</h3>
      <ul className="mt-5 space-y-4">
        {visibleItems.map((item, index) => (
          <li
            className="grid grid-cols-[16px_minmax(0,1fr)] gap-3 font-sans text-lg leading-8 text-ink/85"
            key={item._key ?? `${item.text}-${index}`}
          >
            <span aria-hidden className="mt-3 size-2 rounded-full bg-plum" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectCaseStudyContent({
  caseStudy,
  labels,
  onOpenImage,
  projectTitle,
}: ProjectCaseStudyContentProps) {
  const showResults =
    hasResults(caseStudy.measuredResults) ||
    hasResults(caseStudy.expectedImpact) ||
    hasResults(caseStudy.learnings) ||
    hasText(caseStudy.limitation);

  return (
    <>
      <NarrativeSection
        background="bg-cream"
        index="01"
        labels={labels}
        onOpenImage={onOpenImage}
        projectTitle={projectTitle}
        section={caseStudy.problem}
        title={labels.problemTitle}
      />
      <NarrativeSection
        background="bg-periwinkle/35"
        index="02"
        labels={labels}
        onOpenImage={onOpenImage}
        projectTitle={projectTitle}
        section={caseStudy.research}
        title={labels.researchTitle}
      />
      <NarrativeSection
        background="bg-cream"
        index="03"
        labels={labels}
        onOpenImage={onOpenImage}
        projectTitle={projectTitle}
        section={caseStudy.decisions}
        title={labels.decisionsTitle}
      />
      <NarrativeSection
        background="bg-periwinkle/20"
        index="04"
        labels={labels}
        onOpenImage={onOpenImage}
        projectTitle={projectTitle}
        section={caseStudy.solution}
        title={labels.solutionTitle}
      />
      {showResults ? (
        <section className="bg-cream px-5 py-16 md:px-[68px] md:py-[96px]">
          <div className="home-scale grid gap-10 lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
            <Reveal>
              <SectionHeading index="05" title={labels.resultsTitle} />
            </Reveal>
            <Reveal className="grid gap-10 md:grid-cols-2">
              <ResultList
                items={caseStudy.measuredResults}
                title={labels.measuredResultsTitle}
              />
              <ResultList
                items={caseStudy.expectedImpact}
                title={labels.expectedImpactTitle}
              />
              <ResultList items={caseStudy.learnings} title={labels.learningsTitle} />
              {hasText(caseStudy.limitation) ? (
                <div className="border-t border-ink/15 pt-6">
                  <h3 className="font-sans text-xl font-bold text-ink">
                    {labels.limitationTitle}
                  </h3>
                  <p className="mt-5 whitespace-pre-line font-sans text-lg leading-8 text-ink/85">
                    {caseStudy.limitation}
                  </p>
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  );
}
