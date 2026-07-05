import { HomePage } from "@/components/sections/home-page";
import { getServices, getTestimonials } from "@/sanity/lib/home-content";
import { getFeaturedProjects } from "@/sanity/lib/projects";

export const revalidate = 60;

export default async function Page() {
  const [featuredProjects, services, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <HomePage
      featuredProjects={featuredProjects}
      services={services}
      testimonials={testimonials}
    />
  );
}
