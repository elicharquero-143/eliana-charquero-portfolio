import { groq } from "next-sanity";

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc) {
    title,
    "slug": slug.current,
    year,
    description,
    role,
    services,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, href},
    featured,
    category->{title, "slug": slug.current}
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    title,
    "slug": slug.current,
    year,
    description,
    role,
    services,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, href},
    featured,
    category->{title, "slug": slug.current}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    year,
    description,
    role,
    services,
    tools,
    "coverImage": coverImage.asset->url,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    externalLinks[]{label, href},
    featured,
    category->{title, "slug": slug.current}
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    "projects": *[_type == "project" && references(^._id)] | order(year desc) {
      title,
      "slug": slug.current,
      year,
      description,
      "coverImage": coverImage.asset->url,
      category->{title, "slug": slug.current}
    }
  }
`;
