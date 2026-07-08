import { dictionaries } from "@/i18n/dictionaries";
import { sanityClient } from "@/sanity/lib/client";
import {
  allProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";
import type { Project } from "@/types/project";

const fallbackProjects = dictionaries.es.projects as readonly Project[];
const sanityFetchOptions = {
  next: { revalidate: 60 },
} as const;

function hasSanityConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    services: project.services ?? [],
    servicesEn: project.servicesEn ?? [],
    tools: project.tools ?? [],
    gallery: project.gallery ?? [],
    externalLinks: project.externalLinks ?? [],
    featured: Boolean(project.featured),
  };
}

async function fetchSanityProjects(query: string): Promise<Project[]> {
  if (!hasSanityConfig()) {
    return [];
  }

  try {
    const projects = await sanityClient.fetch<Project[]>(
      query,
      {},
      sanityFetchOptions,
    );

    return projects
      .filter((project) => project?.title && project?.slug && project?.coverImage)
      .map(normalizeProject);
  } catch {
    return [];
  }
}

export async function getProjects() {
  const projects = await fetchSanityProjects(allProjectsQuery);

  return projects.length > 0 ? projects : [...fallbackProjects];
}

export async function getFeaturedProjects() {
  const projects = await fetchSanityProjects(featuredProjectsQuery);

  return projects.length > 0
    ? projects
    : fallbackProjects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string) {
  if (hasSanityConfig()) {
    try {
      const project = await sanityClient.fetch<Project | null>(
        projectBySlugQuery,
        { slug },
        sanityFetchOptions,
      );

      if (project?.title && project.slug && project.coverImage) {
        return normalizeProject(project);
      }
    } catch {
      return fallbackProjects.find((project) => project.slug === slug) ?? null;
    }
  }

  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export async function getProjectSlugs() {
  if (hasSanityConfig()) {
    try {
      const projects = await sanityClient.fetch<Array<{ slug: string }>>(
        projectSlugsQuery,
        {},
        sanityFetchOptions,
      );

      if (projects.length > 0) {
        return projects.filter((project) => project.slug);
      }
    } catch {
      return fallbackProjects.map((project) => ({ slug: project.slug }));
    }
  }

  return fallbackProjects.map((project) => ({ slug: project.slug }));
}
