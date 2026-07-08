import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoría de trabajos",
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
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionEn",
      title: "Descripción en inglés",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
