import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactSection } from "@/components/sections/contact-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import type { CmsService, CmsTestimonial } from "@/sanity/lib/home-content";
import type { Project } from "@/types/project";

type HomePageProps = {
  featuredProjects?: Project[];
  services?: CmsService[];
  testimonials?: CmsTestimonial[];
};

export function HomePage({
  featuredProjects,
  services,
  testimonials,
}: HomePageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <HomeHero />
      <ServicesPreview initialServices={services} />
      <FeaturedProjects initialProjects={featuredProjects} />
      <TestimonialsSection initialTestimonials={testimonials} />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
