import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Página de inicio",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Título principal",
      type: "string",
    }),
    defineField({
      name: "introTitle",
      title: "Título de introducción",
      type: "string",
    }),
    defineField({
      name: "introBody",
      title: "Texto de introducción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredProjects",
      title: "Trabajos destacados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "servicesPreview",
      title: "Servicios visibles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonios / Clientes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    defineField({
      name: "contactTitle",
      title: "Título de contacto",
      type: "string",
    }),
  ],
});
