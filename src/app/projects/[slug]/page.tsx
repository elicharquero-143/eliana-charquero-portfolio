import { ProjectDetailPage } from "@/components/projects/project-detail-page";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/projects";

type ProjectSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  return getProjectSlugs();
}

export default async function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return <ProjectDetailPage initialProject={project} slug={slug} />;
}
