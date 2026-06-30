import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre mí",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "intro", title: "Introducción", type: "text", rows: 4 }),
    defineField({
      name: "profileImage",
      title: "Foto de perfil",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "areas",
      title: "Áreas",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "toolkit",
      title: "Herramientas",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
