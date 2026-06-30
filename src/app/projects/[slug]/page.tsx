import { ProjectDetailPage } from "@/components/projects/project-detail-page";
import { dictionaries } from "@/i18n/dictionaries";
import { getProjectBySlug } from "@/sanity/lib/projects";

type ProjectSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return dictionaries.es.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return <ProjectDetailPage initialProject={project} slug={slug} />;
}
