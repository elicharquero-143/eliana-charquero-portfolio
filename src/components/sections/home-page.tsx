import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import type { Project } from "@/types/project";

type HomePageProps = {
  featuredProjects?: Project[];
};

export function HomePage({ featuredProjects }: HomePageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <HomeHero />
      <ServicesPreview />
      <FeaturedProjects initialProjects={featuredProjects} />
      <TestimonialsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
