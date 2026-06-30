import { HomePage } from "@/components/sections/home-page";
import { getFeaturedProjects } from "@/sanity/lib/projects";

export default async function Page() {
  const featuredProjects = await getFeaturedProjects();

  return <HomePage featuredProjects={featuredProjects} />;
}
