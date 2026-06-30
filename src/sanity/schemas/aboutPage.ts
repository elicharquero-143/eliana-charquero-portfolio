import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "areas",
      title: "Areas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "toolkit",
      title: "Toolkit",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
