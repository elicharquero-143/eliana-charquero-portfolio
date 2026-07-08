import { groq } from "next-sanity";

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc) {
    title,
    titleEn,
    "slug": slug.current,
    year,
    description,
    descriptionEn,
    role,
    roleEn,
    services,
    servicesEn,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, labelEn, href},
    featured,
    category->{title, titleEn, "slug": slug.current, description, descriptionEn}
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    title,
    titleEn,
    "slug": slug.current,
    year,
    description,
    descriptionEn,
    role,
    roleEn,
    services,
    servicesEn,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, labelEn, href},
    featured,
    category->{title, titleEn, "slug": slug.current, description, descriptionEn}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    titleEn,
    "slug": slug.current,
    year,
    description,
    descriptionEn,
    role,
    roleEn,
    services,
    servicesEn,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, labelEn, href},
    featured,
    category->{title, titleEn, "slug": slug.current, description, descriptionEn}
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    title,
    titleEn,
    "slug": slug.current,
    description,
    descriptionEn,
    "projects": *[_type == "project" && references(^._id)] | order(year desc) {
      title,
      titleEn,
      "slug": slug.current,
      year,
      description,
      descriptionEn,
      "coverImage": coverImage.asset->url,
      category->{title, titleEn, "slug": slug.current}
    }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title,
    "slug": slug.current,
    description,
    "icon": icon.asset->url,
    order,
    relatedWizardAnswers
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc) {
    quote,
    name,
    role,
    company,
    "avatar": avatar.asset->url,
    rating
  }
`;
