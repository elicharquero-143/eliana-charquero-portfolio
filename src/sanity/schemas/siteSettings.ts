import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes generales",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Título del sitio",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Descripción del sitio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "navigation",
      title: "Navegación",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Redes y links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Texto del pie de página",
      type: "string",
    }),
    defineField({
      name: "defaultSeoImage",
      title: "Imagen SEO por defecto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
