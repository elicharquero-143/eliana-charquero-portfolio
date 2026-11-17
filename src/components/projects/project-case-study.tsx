"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type {
  ProjectAiProcess,
  ProjectAiProduct,
  ProjectCaseStudy,
  ProjectResultItem,
  ProjectStoryBlock,
  ProjectStoryMedia,
  ProjectStorySection,
} from "@/types/project";

type CaseStudyLabels = {
  aiContributionTitle: string;
  aiControlTitle: string;
  aiDataTitle: string;
  aiDirectionTitle: string;
  aiFunctionTitle: string;
  aiLimitsTitle: string;
  aiNeedTitle: string;
  aiProcessTitle: string;
  aiProductTitle: string;
  aiReviewTitle: string;
  aiTaskTitle: string;
  aiToolTitle: string;
  conceptualTitle: string;
  decisionsTitle: string;
  expectedImpactTitle: string;
  implementedTitle: string;
  learningsTitle: string;
  limitationTitle: string;
  measuredResultsTitle: string;
  problemTitle: string;
  prototypedTitle: string;
  qualitativeObservationsTitle: string;
  researchTitle: string;
  responsiblePracticesTitle: string;
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

function hasAiProcess(process?: ProjectAiProcess) {
  return Boolean(
    process &&
      (hasText(process.intro) ||
        process.items?.some((item) =>
          [
            item.task,
            item.tool,
            item.function,
            item.direction,
            item.review,
            item.contribution,
          ].some(hasText),
        ) ||
        hasResults(process.responsiblePractices)),
  );
}

function hasAiProduct(product?: ProjectAiProduct) {
  return Boolean(
    product &&
      ([
          product.need,
          product.dataNeeded,
          product.userControl,
          product.uncertaintyAndLimits,
          product.conceptualScope,
          product.prototypedScope,
          product.implementedScope,
        ].some(hasText) || hasResults(product.responsiblePractices)),
  );
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
        hasAiProcess(caseStudy.aiProcess) ||
        hasAiProduct(caseStudy.aiProduct) ||
        hasResults(caseStudy.measuredResults) ||
        hasResults(caseStudy.qualitativeObservations) ||
        hasResults(caseStudy.expectedImpact) ||
        hasResults(caseStudy.learnings) ||
        hasText(caseStudy.limitation)),
  );
}

function AiDetail({ label, value }: { label: string; value?: string }) {
  if (!hasText(value)) {
    return null;
  }

  return (
    <div>
      <dt className="font-mono text-xs font-bold uppercase text-plum">{label}</dt>
      <dd className="mt-2 whitespace-pre-line font-sans text-lg leading-8 text-ink/85">
        {value}
      </dd>
    </div>
  );
}

function AiProcessSection({
  background,
  index,
  labels,
  process,
}: {
  background: string;
  index: string;
  labels: CaseStudyLabels;
  process: ProjectAiProcess;
}) {
  const items = process.items?.filter((item) =>
    [item.task, item.tool, item.function, item.direction, item.review, item.contribution].some(
      hasText,
    ),
  );

  return (
    <section className={`${background} px-5 py-16 md:px-[68px] md:py-[96px]`}>
      <div className="home-scale grid gap-10 lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
        <Reveal>
          <SectionHeading
            index={index}
            title={process.title || labels.aiProcessTitle}
          />
        </Reveal>
        <div>
          {hasText(process.intro) ? (
            <Reveal>
              <p className="max-w-[820px] whitespace-pre-line text-pretty font-sans text-xl leading-9 text-ink md:text-2xl md:leading-10">
                {process.intro}
              </p>
            </Reveal>
          ) : null}
          {items?.length ? (
            <Stagger className={`${hasText(process.intro) ? "mt-12" : ""} space-y-12`}>
              {items.map((item, itemIndex) => (
                <StaggerItem key={item._key ?? `${item.task}-${itemIndex}`}>
                  <article className="border-t border-ink/15 pt-7">
                    <div className="grid gap-6 md:grid-cols-[72px_minmax(0,1fr)]">
                      <p className="font-mono text-sm text-muted">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </p>
                      <div>
                        {hasText(item.task) ? (
                          <h3 className="font-sans text-2xl font-bold leading-tight text-ink md:text-[30px]">
                            {item.task}
                          </h3>
                        ) : null}
                        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                          <AiDetail label={labels.aiToolTitle} value={item.tool} />
                          <AiDetail label={labels.aiFunctionTitle} value={item.function} />
                          <AiDetail label={labels.aiDirectionTitle} value={item.direction} />
                          <AiDetail label={labels.aiReviewTitle} value={item.review} />
                          <AiDetail
                            label={labels.aiContributionTitle}
                            value={item.contribution}
                          />
                        </dl>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}
          {hasResults(process.responsiblePractices) ? (
            <Reveal className={items?.length || hasText(process.intro) ? "mt-12" : ""}>
              <ResultList
                items={process.responsiblePractices}
                title={labels.responsiblePracticesTitle}
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function AiProductSection({
  background,
  index,
  labels,
  product,
}: {
  background: string;
  index: string;
  labels: CaseStudyLabels;
  product: ProjectAiProduct;
}) {
  const productDetails = [
    { label: labels.aiNeedTitle, value: product.need },
    { label: labels.aiDataTitle, value: product.dataNeeded },
    { label: labels.aiControlTitle, value: product.userControl },
    { label: labels.aiLimitsTitle, value: product.uncertaintyAndLimits },
  ].filter((item) => hasText(item.value));
  const maturity = [
    { label: labels.conceptualTitle, value: product.conceptualScope },
    { label: labels.prototypedTitle, value: product.prototypedScope },
    { label: labels.implementedTitle, value: product.implementedScope },
  ].filter((item) => hasText(item.value));

  return (
    <section className={`${background} px-5 py-16 md:px-[68px] md:py-[96px]`}>
      <div className="home-scale grid gap-10 lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
        <Reveal>
          <SectionHeading
            index={index}
            title={product.title || labels.aiProductTitle}
          />
        </Reveal>
        <div>
          {productDetails.length ? (
            <Reveal>
              <dl className="grid gap-8 border-t border-ink/15 pt-7 md:grid-cols-2">
                {productDetails.map((item) => (
                  <AiDetail key={item.label} label={item.label} value={item.value} />
                ))}
              </dl>
            </Reveal>
          ) : null}
          {maturity.length ? (
            <Stagger className={`${productDetails.length ? "mt-12" : ""} grid gap-5 md:grid-cols-3`}>
              {maturity.map((item) => (
                <StaggerItem key={item.label}>
                  <article className="h-full rounded-lg border border-ink/15 bg-cream/70 p-6">
                    <h3 className="font-mono text-xs font-bold uppercase text-plum">
                      {item.label}
                    </h3>
                    <p className="mt-4 whitespace-pre-line font-sans text-lg leading-8 text-ink/85">
                      {item.value}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}
          {hasResults(product.responsiblePractices) ? (
            <Reveal className={productDetails.length || maturity.length ? "mt-12" : ""}>
              <ResultList
                items={product.responsiblePractices}
                title={labels.responsiblePracticesTitle}
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
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
  showCaptions = true,
  viewImage,
}: {
  media?: ProjectStoryMedia[];
  onOpenImage: (url: string) => void;
  projectTitle: string;
  showCaptions?: boolean;
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
            {showCaptions && hasText(item.caption) ? (
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
          className={
            block.mediaOnly && hasMedia(block.media)
              ? ""
              : "border-t border-ink/15 pt-7"
          }
          key={block._key ?? `${block.title}-${index}`}
        >
          {!block.mediaOnly ? (
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
          ) : null}
          {hasMedia(block.media) ? (
            <div className={block.mediaOnly ? "" : "mt-7 md:ml-[96px]"}>
              <StoryMediaGrid
                media={block.media}
                onOpenImage={onOpenImage}
                projectTitle={projectTitle}
                showCaptions={!block.mediaOnly}
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
    hasResults(caseStudy.qualitativeObservations) ||
    hasResults(caseStudy.expectedImpact) ||
    hasResults(caseStudy.learnings) ||
    hasText(caseStudy.limitation);

  const narrativeSections = [
    {
      stage: "problem" as const,
      section: caseStudy.problem,
      title: caseStudy.problemTitle || labels.problemTitle,
    },
    {
      stage: "research" as const,
      section: caseStudy.research,
      title: caseStudy.researchTitle || labels.researchTitle,
    },
    {
      stage: "decisions" as const,
      section: caseStudy.decisions,
      title: caseStudy.decisionsTitle || labels.decisionsTitle,
    },
    {
      stage: "solution" as const,
      section: caseStudy.solution,
      title: caseStudy.solutionTitle || labels.solutionTitle,
    },
  ].filter(({ section }) => hasSection(section));

  type DisplaySection =
    | { kind: "story"; section: ProjectStorySection; title: string }
    | { kind: "aiProcess"; process: ProjectAiProcess }
    | { kind: "aiProduct"; product: ProjectAiProduct };

  const displaySections: DisplaySection[] = [];
  const aiPlacement = caseStudy.aiProcess?.placement ?? "decisions";
  let aiProcessAdded = false;
  let aiProductAdded = false;

  narrativeSections.forEach(({ section, stage, title }) => {
    if (section) {
      displaySections.push({ kind: "story", section, title });
    }

    if (
      stage === aiPlacement &&
      caseStudy.aiProcess &&
      hasAiProcess(caseStudy.aiProcess)
    ) {
      displaySections.push({ kind: "aiProcess", process: caseStudy.aiProcess });
      aiProcessAdded = true;
    }

    if (stage === "solution" && caseStudy.aiProduct && hasAiProduct(caseStudy.aiProduct)) {
      displaySections.push({ kind: "aiProduct", product: caseStudy.aiProduct });
      aiProductAdded = true;
    }
  });

  if (!aiProcessAdded && caseStudy.aiProcess && hasAiProcess(caseStudy.aiProcess)) {
    displaySections.push({ kind: "aiProcess", process: caseStudy.aiProcess });
  }

  if (!aiProductAdded && caseStudy.aiProduct && hasAiProduct(caseStudy.aiProduct)) {
    displaySections.push({ kind: "aiProduct", product: caseStudy.aiProduct });
  }

  return (
    <>
      {displaySections.map((item, index) => {
        const background = index % 2 === 0 ? "bg-cream" : "bg-periwinkle/25";
        const sectionIndex = String(index + 1).padStart(2, "0");

        if (item.kind === "aiProcess") {
          return (
            <AiProcessSection
              background={background}
              index={sectionIndex}
              key="ai-process"
              labels={labels}
              process={item.process}
            />
          );
        }

        if (item.kind === "aiProduct") {
          return (
            <AiProductSection
              background={background}
              index={sectionIndex}
              key="ai-product"
              labels={labels}
              product={item.product}
            />
          );
        }

        return (
          <NarrativeSection
            background={background}
            index={sectionIndex}
            key={item.title}
            labels={labels}
            onOpenImage={onOpenImage}
            projectTitle={projectTitle}
            section={item.section}
            title={item.title}
          />
        );
      })}
      {showResults ? (
        <section className="bg-cream px-5 py-16 md:px-[68px] md:py-[96px]">
          <div className="home-scale grid gap-10 lg:grid-cols-[minmax(260px,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                index={String(displaySections.length + 1).padStart(2, "0")}
                title={caseStudy.resultsTitle || labels.resultsTitle}
              />
            </Reveal>
            <Reveal className="grid gap-10 md:grid-cols-2">
              <ResultList
                items={caseStudy.measuredResults}
                title={labels.measuredResultsTitle}
              />
              <ResultList
                items={caseStudy.qualitativeObservations}
                title={labels.qualitativeObservationsTitle}
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
