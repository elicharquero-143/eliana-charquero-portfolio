import { dictionaries } from "@/i18n/dictionaries";
import { sanityClient } from "@/sanity/lib/client";
import { servicesQuery, testimonialsQuery } from "@/sanity/lib/queries";

export type CmsService = {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  relatedWizardAnswers?: string[];
};

export type CmsTestimonial = {
  quote: string;
  quoteEn?: string;
  name: string;
  role?: string;
  roleEn?: string;
  company?: string;
  avatar?: string;
  rating?: number;
};

function hasSanityConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

const sanityFetchOptions = {
  next: { revalidate: 60 },
} as const;

export async function getServices() {
  if (hasSanityConfig()) {
    try {
      const services = await sanityClient.fetch<CmsService[]>(
        servicesQuery,
        {},
        sanityFetchOptions,
      );

      if (services.length > 0) {
        return services.filter((service) => service.title && service.slug);
      }
    } catch {
      return [...dictionaries.es.services];
    }
  }

  return [...dictionaries.es.services];
}

export async function getTestimonials() {
  if (hasSanityConfig()) {
    try {
      const testimonials =
        await sanityClient.fetch<CmsTestimonial[]>(
          testimonialsQuery,
          {},
          sanityFetchOptions,
        );

      if (testimonials.length > 0) {
        return testimonials.filter(
          (testimonial) => testimonial.quote && testimonial.name,
        );
      }
    } catch {
      return [...dictionaries.es.testimonials];
    }
  }

  return [...dictionaries.es.testimonials];
}
