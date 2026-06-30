import type { Project } from "@/types/project";

export const homeIntro = {
  title: "Hola, soy Eli ...",
  body:
    "Diseñadora de comunicación visual y UX/UI. Me apasiona crear experiencias digitales y visuales que conecten con las personas a través de la creatividad, la estrategia y el diseño.",
  image: "/images/figma/foto-eli.png",
};

export const servicesPreview = [
  {
    title: "Art Direction",
    description:
      "Desarrollo de conceptos y direcciones visuales para experiencias y campañas.",
    icon: "/images/figma/service-art-direction.png",
    slug: "art-direction",
  },
  {
    title: "Branding",
    description: "Creación de identidades visuales para marcas y proyectos.",
    icon: "/images/figma/service-branding.png",
    slug: "branding",
  },
  {
    title: "UX UI & Web Design",
    description:
      "Diseño de productos digitales y sitios web centrados en la experiencia de usuario.",
    icon: "/images/figma/service-ux-ui.png",
    slug: "ux-ui-web-design",
  },
  {
    title: "Ilustración",
    description:
      "Ilustraciones para enriquecer la comunicación visual de marcas y proyectos.",
    icon: "/images/figma/service-illustration.png",
    slug: "ilustracion",
  },
] as const;

export const featuredProjects: Project[] = [
  {
    title: "SOY YO, YO SOY",
    slug: "soy-yo-yo-soy",
    category: { title: "Identidad de marca", slug: "branding" },
    year: "2025",
    description: "Identidad visual para un proyecto de marca personal.",
    role: "Diseño visual",
    services: ["Branding", "Identidad"],
    tools: ["Illustrator", "Photoshop"],
    coverImage: "/images/figma/project-soy-yo.png",
    gallery: [],
    featured: true,
  },
  {
    title: "GuIA",
    slug: "guia",
    category: { title: "App de movilidad segura", slug: "ux-ui" },
    year: "2025",
    description: "Producto digital orientado a movilidad segura.",
    role: "UX/UI",
    services: ["UX/UI", "Producto digital"],
    tools: ["Figma"],
    coverImage: "/images/figma/project-guia-bg.png",
    gallery: ["/images/figma/project-guia-overlay.png"],
    featured: true,
  },
  {
    title: "Florecer App",
    slug: "florecer-app",
    category: { title: "App de apoyo educativo", slug: "ux-ui" },
    year: "2025",
    description: "Aplicación educativa con identidad visual propia.",
    role: "UX/UI",
    services: ["UX/UI", "Visual design"],
    tools: ["Figma"],
    coverImage: "/images/figma/project-florecer.png",
    gallery: [],
    featured: true,
  },
];

export const testimonials = [
  {
    quote:
      "Eliana transformed our brand vision into a digital reality that exceeded all expectations. Her minimalist approach is pure art.",
    name: "Gemma Nolen",
    company: "GOOGLE",
  },
  {
    quote:
      "Working with Eliana was a seamless experience. Her attention to typographic detail and user flow is unparalleled.",
    name: "Gemma Nolen",
    company: "APPLE",
  },
  {
    quote:
      "A true professional with a unique editorial eye. She knows how to make content breathe and engage the audience.",
    name: "Gemma Nolen",
    company: "NIKE",
  },
] as const;
