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

export type ProjectStoryMedia = {
  _key?: string;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  altEn?: string;
  caption?: string;
  captionEn?: string;
};

export type ProjectStoryBlock = {
  _key?: string;
  mediaOnly?: boolean;
  title?: string;
  titleEn?: string;
  body?: string;
  bodyEn?: string;
  media?: ProjectStoryMedia[];
};

export type ProjectStorySection = {
  intro?: string;
  introEn?: string;
  media?: ProjectStoryMedia[];
  blocks?: ProjectStoryBlock[];
};

export type ProjectResultItem = {
  _key?: string;
  text: string;
  textEn?: string;
};

export type ProjectCaseStudy = {
  enabled?: boolean;
  context?: string;
  contextEn?: string;
  status?: string;
  statusEn?: string;
  problemTitle?: string;
  problemTitleEn?: string;
  researchTitle?: string;
  researchTitleEn?: string;
  decisionsTitle?: string;
  decisionsTitleEn?: string;
  solutionTitle?: string;
  solutionTitleEn?: string;
  resultsTitle?: string;
  resultsTitleEn?: string;
  problem?: ProjectStorySection;
  research?: ProjectStorySection;
  decisions?: ProjectStorySection;
  solution?: ProjectStorySection;
  measuredResults?: ProjectResultItem[];
  expectedImpact?: ProjectResultItem[];
  learnings?: ProjectResultItem[];
  limitation?: string;
  limitationEn?: string;
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
  caseStudy?: ProjectCaseStudy;
  featured: boolean;
};
