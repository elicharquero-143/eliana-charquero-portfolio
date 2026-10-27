import { defineArrayMember, defineField, defineType } from "sanity";

const storyMedia = defineArrayMember({
  name: "projectStoryMedia",
  title: "Imagen del relato",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Descripción accesible",
      type: "string",
      description: "Describe lo que aporta la imagen, no solo cómo se ve.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altEn",
      title: "Descripción accesible en inglés",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Epígrafe",
      type: "string",
    }),
    defineField({
      name: "captionEn",
      title: "Epígrafe en inglés",
      type: "string",
    }),
  ],
  preview: {
    select: { media: "image", title: "caption", subtitle: "alt" },
    prepare({ media, subtitle, title }) {
      return { media, subtitle, title: title || subtitle || "Imagen" };
    },
  },
});

const storyBlock = defineArrayMember({
  name: "projectStoryBlock",
  title: "Bloque de contenido",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "titleEn",
      title: "Título en inglés",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Explicación",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyEn",
      title: "Explicación en inglés",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "media",
      title: "Imágenes relacionadas",
      type: "array",
      of: [storyMedia],
    }),
  ],
  preview: {
    select: { media: "media.0.image", title: "title", subtitle: "body" },
    prepare({ media, subtitle, title }) {
      return { media, subtitle, title: title || "Bloque sin título" };
    },
  },
});

const resultItem = defineArrayMember({
  name: "projectResultItem",
  title: "Resultado o aprendizaje",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Texto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "textEn",
      title: "Texto en inglés",
      type: "string",
    }),
  ],
  preview: { select: { title: "text", subtitle: "textEn" } },
});

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
      name: "caseStudy",
      title: "Caso de estudio UX",
      type: "object",
      description:
        "Actívalo solo cuando el proyecto tenga contenido editorial revisado. La web ocultará automáticamente los apartados vacíos.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Usar presentación de caso de estudio",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "context",
          title: "Contexto breve",
          type: "string",
          description: "Ej.: Proyecto académico, rediseño conceptual o cliente.",
        }),
        defineField({
          name: "contextEn",
          title: "Contexto breve en inglés",
          type: "string",
        }),
        defineField({
          name: "status",
          title: "Estado del proyecto",
          type: "string",
          description: "Ej.: Prototipo validado, concepto o en desarrollo.",
        }),
        defineField({
          name: "statusEn",
          title: "Estado del proyecto en inglés",
          type: "string",
        }),
        defineField({
          name: "problem",
          title: "1. Problema",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "intro",
              title: "Situación, personas afectadas y desafío",
              type: "text",
              rows: 6,
            }),
            defineField({
              name: "introEn",
              title: "Problema en inglés",
              type: "text",
              rows: 6,
            }),
            defineField({
              name: "media",
              title: "Imágenes que explican el problema",
              type: "array",
              of: [storyMedia],
            }),
          ],
        }),
        defineField({
          name: "research",
          title: "2. Investigación y hallazgos",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "intro",
              title: "Introducción opcional",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "introEn",
              title: "Introducción en inglés",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "blocks",
              title: "Hallazgos",
              type: "array",
              of: [storyBlock],
            }),
          ],
        }),
        defineField({
          name: "decisions",
          title: "3. Decisiones de diseño",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "intro",
              title: "Introducción opcional",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "introEn",
              title: "Introducción en inglés",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "blocks",
              title: "Decisiones documentadas",
              type: "array",
              description: "Recomendado: dos o tres decisiones.",
              of: [storyBlock],
            }),
          ],
        }),
        defineField({
          name: "solution",
          title: "4. Solución",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "intro",
              title: "Introducción al recorrido",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "introEn",
              title: "Introducción en inglés",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "blocks",
              title: "Pasos del recorrido",
              type: "array",
              of: [storyBlock],
            }),
          ],
        }),
        defineField({
          name: "measuredResults",
          title: "5. Resultados comprobados",
          type: "array",
          description: "Incluye solo resultados observados o medidos.",
          of: [resultItem],
        }),
        defineField({
          name: "expectedImpact",
          title: "Impacto esperado",
          type: "array",
          description: "Beneficios esperados que todavía no fueron medidos.",
          of: [resultItem],
        }),
        defineField({
          name: "learnings",
          title: "Aprendizajes",
          type: "array",
          of: [resultItem],
        }),
        defineField({
          name: "limitation",
          title: "Límite de validación o implementación",
          type: "text",
          rows: 4,
          description:
            "Aclara si el proyecto no fue implementado, probado o medido.",
        }),
        defineField({
          name: "limitationEn",
          title: "Límite en inglés",
          type: "text",
          rows: 4,
        }),
      ],
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
