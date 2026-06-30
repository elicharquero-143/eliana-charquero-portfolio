import { ProjectsPage } from "@/components/sections/projects-page";
import { getProjects } from "@/sanity/lib/projects";

export default async function ProjectsRoute() {
  const projects = await getProjects();

  return <ProjectsPage initialProjects={projects} />;
}
