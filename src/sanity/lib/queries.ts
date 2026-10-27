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
  *[_type == "project" && slug.current in [$slug, $decodedSlug]][0] {
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
    caseStudy{
      enabled,
      context,
      contextEn,
      status,
      statusEn,
      problem{
        intro,
        introEn,
        "media": media[]{
          _key,
          alt,
          altEn,
          caption,
          captionEn,
          "url": image.asset->url,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height
        }
      },
      research{
        intro,
        introEn,
        "blocks": blocks[]{
          _key,
          title,
          titleEn,
          body,
          bodyEn,
          "media": media[]{
            _key,
            alt,
            altEn,
            caption,
            captionEn,
            "url": image.asset->url,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height
          }
        }
      },
      decisions{
        intro,
        introEn,
        "blocks": blocks[]{
          _key,
          title,
          titleEn,
          body,
          bodyEn,
          "media": media[]{
            _key,
            alt,
            altEn,
            caption,
            captionEn,
            "url": image.asset->url,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height
          }
        }
      },
      solution{
        intro,
        introEn,
        "blocks": blocks[]{
          _key,
          title,
          titleEn,
          body,
          bodyEn,
          "media": media[]{
            _key,
            alt,
            altEn,
            caption,
            captionEn,
            "url": image.asset->url,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height
          }
        }
      },
      measuredResults[]{_key, text, textEn},
      expectedImpact[]{_key, text, textEn},
      learnings[]{_key, text, textEn},
      limitation,
      limitationEn
    },
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
    quoteEn,
    name,
    role,
    roleEn,
    company,
    "avatar": avatar.asset->url,
    rating
  }
`;
