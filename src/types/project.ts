export type ProjectCategory = {
  title: string;
  slug: string;
  description?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategory;
  year: string;
  description: string;
  role: string;
  services: string[];
  tools: string[];
  coverImage: string;
  heroImage?: string;
  gallery: string[];
  externalLinks?: ProjectLink[];
  featured: boolean;
};
