import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "relatedWizardAnswers",
      title: "Related Wizard Answers",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
