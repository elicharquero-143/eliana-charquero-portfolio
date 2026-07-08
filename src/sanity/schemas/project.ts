import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Trabajo / Proyecto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Título en inglés",
      type: "string",
      description: "Opcional. Si está vacío, la web usará el título en español.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionEn",
      title: "Descripción en inglés",
      type: "text",
      rows: 5,
      description:
        "Opcional. Si está vacío, la web usará la descripción en español.",
    }),
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
    }),
    defineField({
      name: "roleEn",
      title: "Rol en inglés",
      type: "string",
    }),
    defineField({
      name: "services",
      title: "Servicios",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "servicesEn",
      title: "Servicios en inglés",
      type: "array",
      of: [{ type: "string" }],
      description: "Opcional. Mantén el mismo orden que en Servicios.",
    }),
    defineField({
      name: "tools",
      title: "Herramientas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galería de imágenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "externalLinks",
      title: "Botones externos / prototipos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Texto del botón", type: "string" },
            {
              name: "labelEn",
              title: "Texto del botón en inglés",
              type: "string",
            },
            { name: "href", title: "Link", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Descripción SEO",
      type: "text",
      rows: 3,
    }),
  ],
});
