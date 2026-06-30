import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonio / Cliente",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Testimonio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Puntaje",
      type: "number",
      initialValue: 5,
    }),
  ],
});
