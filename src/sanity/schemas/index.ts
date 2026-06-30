import { aboutPage } from "@/sanity/schemas/aboutPage";
import { category } from "@/sanity/schemas/category";
import { homePage } from "@/sanity/schemas/homePage";
import { project } from "@/sanity/schemas/project";
import { service } from "@/sanity/schemas/service";
import { siteSettings } from "@/sanity/schemas/siteSettings";
import { testimonial } from "@/sanity/schemas/testimonial";

export const schemaTypes = [
  project,
  category,
  service,
  testimonial,
  siteSettings,
  homePage,
  aboutPage,
];
