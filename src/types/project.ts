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

export type ProjectAiProcessItem = {
  _key?: string;
  task?: string;
  taskEn?: string;
  tool?: string;
  toolEn?: string;
  function?: string;
  functionEn?: string;
  direction?: string;
  directionEn?: string;
  review?: string;
  reviewEn?: string;
  contribution?: string;
  contributionEn?: string;
};

export type ProjectAiProcess = {
  title?: string;
  titleEn?: string;
  intro?: string;
  introEn?: string;
  placement?: "research" | "decisions" | "solution";
  items?: ProjectAiProcessItem[];
  responsiblePractices?: ProjectResultItem[];
};

export type ProjectAiProduct = {
  title?: string;
  titleEn?: string;
  need?: string;
  needEn?: string;
  dataNeeded?: string;
  dataNeededEn?: string;
  userControl?: string;
  userControlEn?: string;
  uncertaintyAndLimits?: string;
  uncertaintyAndLimitsEn?: string;
  conceptualScope?: string;
  conceptualScopeEn?: string;
  prototypedScope?: string;
  prototypedScopeEn?: string;
  implementedScope?: string;
  implementedScopeEn?: string;
  responsiblePractices?: ProjectResultItem[];
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
  aiProcess?: ProjectAiProcess;
  aiProduct?: ProjectAiProduct;
  measuredResults?: ProjectResultItem[];
  qualitativeObservations?: ProjectResultItem[];
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
