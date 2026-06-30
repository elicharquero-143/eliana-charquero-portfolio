import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      rows: 4,
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "relatedWizardAnswers",
      title: "Respuestas relacionadas del formulario guiado",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
