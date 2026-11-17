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
    defineField({
      name: "mediaOnly",
      title: "Mostrar solo las imágenes",
      type: "boolean",
      description:
        "Oculta el título, la explicación y los epígrafes de este bloque en la web.",
      initialValue: false,
    }),
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

const aiProcessItem = defineArrayMember({
  name: "projectAiProcessItem",
  title: "Uso de IA en el proceso",
  type: "object",
  fields: [
    defineField({ name: "task", title: "Tarea que necesitaba resolver", type: "string" }),
    defineField({ name: "taskEn", title: "Tarea en inglés", type: "string" }),
    defineField({ name: "tool", title: "Herramienta utilizada", type: "string" }),
    defineField({ name: "toolEn", title: "Herramienta en inglés", type: "string" }),
    defineField({ name: "function", title: "Función utilizada", type: "text", rows: 3 }),
    defineField({ name: "functionEn", title: "Función en inglés", type: "text", rows: 3 }),
    defineField({ name: "direction", title: "Cómo orienté el trabajo", type: "text", rows: 3 }),
    defineField({ name: "directionEn", title: "Orientación en inglés", type: "text", rows: 3 }),
    defineField({ name: "review", title: "Qué revisé o corregí", type: "text", rows: 3 }),
    defineField({ name: "reviewEn", title: "Revisión en inglés", type: "text", rows: 3 }),
    defineField({ name: "contribution", title: "Aporte al proceso", type: "text", rows: 3 }),
    defineField({ name: "contributionEn", title: "Aporte en inglés", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "task", subtitle: "tool" } },
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
          name: "problemTitle",
          title: "Título de Problema",
          type: "string",
        }),
        defineField({
          name: "problemTitleEn",
          title: "Título de Problema en inglés",
          type: "string",
        }),
        defineField({
          name: "researchTitle",
          title: "Título de Investigación / Enfoque",
          type: "string",
        }),
        defineField({
          name: "researchTitleEn",
          title: "Título de Investigación / Enfoque en inglés",
          type: "string",
        }),
        defineField({
          name: "decisionsTitle",
          title: "Título de Decisiones",
          type: "string",
        }),
        defineField({
          name: "decisionsTitleEn",
          title: "Título de Decisiones en inglés",
          type: "string",
        }),
        defineField({
          name: "solutionTitle",
          title: "Título de Solución",
          type: "string",
        }),
        defineField({
          name: "solutionTitleEn",
          title: "Título de Solución en inglés",
          type: "string",
        }),
        defineField({
          name: "resultsTitle",
          title: "Título de Resultados",
          type: "string",
        }),
        defineField({
          name: "resultsTitleEn",
          title: "Título de Resultados en inglés",
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
          name: "aiProcess",
          title: "IA utilizada en mi proceso de trabajo",
          type: "object",
          description:
            "Completa este apartado solo si utilizaste IA. Si queda vacío, no aparecerá en la web.",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "title", title: "Título opcional", type: "string" }),
            defineField({ name: "titleEn", title: "Título en inglés", type: "string" }),
            defineField({ name: "intro", title: "Introducción breve", type: "text", rows: 4 }),
            defineField({ name: "introEn", title: "Introducción en inglés", type: "text", rows: 4 }),
            defineField({
              name: "placement",
              title: "Mostrar después de",
              type: "string",
              initialValue: "decisions",
              options: {
                list: [
                  { title: "Investigación", value: "research" },
                  { title: "Decisiones de diseño", value: "decisions" },
                  { title: "Solución", value: "solution" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "items",
              title: "Usos documentados",
              type: "array",
              of: [aiProcessItem],
            }),
            defineField({
              name: "responsiblePractices",
              title: "Prácticas de uso responsable confirmadas",
              type: "array",
              description:
                "Incluye solo prácticas realmente aplicadas, como protección de datos, verificación o revisión de sesgos.",
              of: [resultItem],
            }),
          ],
        }),
        defineField({
          name: "aiProduct",
          title: "IA propuesta como funcionalidad del producto",
          type: "object",
          description:
            "Describe una funcionalidad del producto, distinguiendo claramente lo conceptual, prototipado e implementado.",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "title", title: "Título opcional", type: "string" }),
            defineField({ name: "titleEn", title: "Título en inglés", type: "string" }),
            defineField({ name: "need", title: "Necesidad que aborda", type: "text", rows: 4 }),
            defineField({ name: "needEn", title: "Necesidad en inglés", type: "text", rows: 4 }),
            defineField({ name: "dataNeeded", title: "Datos que necesitaría", type: "text", rows: 4 }),
            defineField({ name: "dataNeededEn", title: "Datos en inglés", type: "text", rows: 4 }),
            defineField({ name: "userControl", title: "Qué puede controlar la persona", type: "text", rows: 4 }),
            defineField({ name: "userControlEn", title: "Control en inglés", type: "text", rows: 4 }),
            defineField({ name: "uncertaintyAndLimits", title: "Incertidumbre y límites", type: "text", rows: 4 }),
            defineField({ name: "uncertaintyAndLimitsEn", title: "Incertidumbre y límites en inglés", type: "text", rows: 4 }),
            defineField({ name: "conceptualScope", title: "Qué quedó a nivel conceptual", type: "text", rows: 4 }),
            defineField({ name: "conceptualScopeEn", title: "Alcance conceptual en inglés", type: "text", rows: 4 }),
            defineField({ name: "prototypedScope", title: "Qué fue prototipado", type: "text", rows: 4 }),
            defineField({ name: "prototypedScopeEn", title: "Alcance prototipado en inglés", type: "text", rows: 4 }),
            defineField({ name: "implementedScope", title: "Qué fue implementado", type: "text", rows: 4 }),
            defineField({ name: "implementedScopeEn", title: "Alcance implementado en inglés", type: "text", rows: 4 }),
            defineField({
              name: "responsiblePractices",
              title: "Prácticas responsables previstas o aplicadas",
              type: "array",
              of: [resultItem],
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
          name: "qualitativeObservations",
          title: "Observaciones cualitativas",
          type: "array",
          description:
            "Hallazgos observados sin presentarlos como métricas o resultados medidos.",
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
