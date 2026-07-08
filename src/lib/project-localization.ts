import { dictionaries } from "@/i18n/dictionaries";
import type { Language } from "@/i18n/language-provider";
import type { Project } from "@/types/project";

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

export function localizeProject(project: Project, language: Language): Project {
  const dictionaryFallback =
    language === "en"
      ? (dictionaries.en.projects as readonly Project[]).find(
          (item) => item.slug === project.slug,
        )
      : null;

  return {
    ...project,
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
