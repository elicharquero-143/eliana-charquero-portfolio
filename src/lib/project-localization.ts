import { dictionaries } from "@/i18n/dictionaries";
import type { Language } from "@/i18n/language-provider";
import type {
  Project,
  ProjectCaseStudy,
  ProjectResultItem,
  ProjectStoryBlock,
  ProjectStoryMedia,
  ProjectStorySection,
} from "@/types/project";

const categoryTranslations: Record<string, string> = {
  "App de apoyo educativo": "Educational support app",
  "App de movilidad segura": "Safe mobility app",
  Branding: "Branding",
  "Diseño editorial": "Editorial design",
  "Identidad de marca": "Brand identity",
  Ilustración: "Illustration",
  "Producto digital": "Digital product",
  "UX UI": "UX UI",
  "UX/UI": "UX/UI",
};

const linkTranslations: Record<string, string> = {
  "Ver prototipo": "View prototype",
  "Ver proyecto": "View project",
};

function localizedValue(
  language: Language,
  spanishValue: string,
  englishValue?: string,
) {
  return language === "en" && englishValue?.trim()
    ? englishValue
    : spanishValue;
}

function translatedFallback(value: string, translations: Record<string, string>) {
  return translations[value] ?? value;
}

function localizedArray(
  language: Language,
  spanishValue: string[],
  englishValue?: string[],
) {
  return language === "en" && englishValue && englishValue.length > 0
    ? englishValue
    : spanishValue;
}

function localizeStoryMedia(
  media: ProjectStoryMedia[] | undefined,
  language: Language,
) {
  return media?.map((item) => ({
    ...item,
    alt: localizedValue(language, item.alt ?? "", item.altEn),
    caption: localizedValue(language, item.caption ?? "", item.captionEn),
  }));
}

function localizeStoryBlocks(
  blocks: ProjectStoryBlock[] | undefined,
  language: Language,
) {
  return blocks?.map((block) => ({
    ...block,
    body: localizedValue(language, block.body ?? "", block.bodyEn),
    media: localizeStoryMedia(block.media, language),
    title: localizedValue(language, block.title ?? "", block.titleEn),
  }));
}

function localizeStorySection(
  section: ProjectStorySection | undefined,
  language: Language,
) {
  if (!section) {
    return undefined;
  }

  return {
    ...section,
    blocks: localizeStoryBlocks(section.blocks, language),
    intro: localizedValue(language, section.intro ?? "", section.introEn),
    media: localizeStoryMedia(section.media, language),
  };
}

function localizeResultItems(
  items: ProjectResultItem[] | undefined,
  language: Language,
) {
  return items?.map((item) => ({
    ...item,
    text: localizedValue(language, item.text, item.textEn),
  }));
}

function localizeCaseStudy(
  caseStudy: ProjectCaseStudy | undefined,
  language: Language,
) {
  if (!caseStudy) {
    return undefined;
  }

  return {
    ...caseStudy,
    context: localizedValue(
      language,
      caseStudy.context ?? "",
      caseStudy.contextEn,
    ),
    decisions: localizeStorySection(caseStudy.decisions, language),
    expectedImpact: localizeResultItems(caseStudy.expectedImpact, language),
    learnings: localizeResultItems(caseStudy.learnings, language),
    limitation: localizedValue(
      language,
      caseStudy.limitation ?? "",
      caseStudy.limitationEn,
    ),
    measuredResults: localizeResultItems(caseStudy.measuredResults, language),
    problem: localizeStorySection(caseStudy.problem, language),
    research: localizeStorySection(caseStudy.research, language),
    solution: localizeStorySection(caseStudy.solution, language),
    status: localizedValue(language, caseStudy.status ?? "", caseStudy.statusEn),
  };
}

export function localizeProject(project: Project, language: Language): Project {
  const dictionaryFallback =
    language === "en"
      ? (dictionaries.en.projects as readonly Project[]).find(
          (item) => item.slug === project.slug,
        )
      : null;

  return {
    ...project,
    caseStudy: localizeCaseStudy(project.caseStudy, language),
    category: {
      ...project.category,
      description: localizedValue(
        language,
        project.category.description ?? "",
        project.category.descriptionEn ?? dictionaryFallback?.category.description,
      ),
      title: localizedValue(
        language,
        project.category.title,
        project.category.titleEn ??
          dictionaryFallback?.category.title ??
          translatedFallback(project.category.title, categoryTranslations),
      ),
    },
    description: localizedValue(
      language,
      project.description,
      project.descriptionEn ?? dictionaryFallback?.description,
    ),
    externalLinks: project.externalLinks?.map((link) => ({
      ...link,
      label: localizedValue(
        language,
        link.label,
        link.labelEn ?? translatedFallback(link.label, linkTranslations),
      ),
    })),
    role: localizedValue(language, project.role, project.roleEn ?? dictionaryFallback?.role),
    services: localizedArray(
      language,
      project.services,
      project.servicesEn ?? dictionaryFallback?.services,
    ),
    title: localizedValue(
      language,
      project.title,
      project.titleEn ?? dictionaryFallback?.title,
    ),
  };
}

export function localizeProjects(projects: readonly Project[], language: Language) {
  return projects.map((project) => localizeProject(project, language));
}
