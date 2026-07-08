export type ProjectCategory = {
  title: string;
  titleEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
};

export type ProjectLink = {
  label: string;
  labelEn?: string;
  href: string;
};

export type Project = {
  title: string;
  titleEn?: string;
  slug: string;
  category: ProjectCategory;
  year: string;
  description: string;
  descriptionEn?: string;
  role: string;
  roleEn?: string;
  services: string[];
  servicesEn?: string[];
  tools: string[];
  coverImage: string;
  heroImage?: string;
  gallery: string[];
  externalLinks?: ProjectLink[];
  featured: boolean;
};
