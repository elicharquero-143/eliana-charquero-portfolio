import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const { getCliClient } = require("sanity/cli");

const client = getCliClient({ apiVersion: "2026-06-30" });
const uploadedAssets = new Map();

function imagePath(relativePath) {
  return path.join(root, "public", relativePath.replace(/^\//, ""));
}

async function uploadImage(relativePath) {
  if (!relativePath) {
    return undefined;
  }

  if (uploadedAssets.has(relativePath)) {
    return uploadedAssets.get(relativePath);
  }

  const absolutePath = imagePath(relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`No se encontró la imagen: ${relativePath}`);
    return undefined;
  }

  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(absolutePath),
    { filename: path.basename(absolutePath) },
  );
  const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadedAssets.set(relativePath, image);

  return image;
}

function slug(current) {
  return { _type: "slug", current };
}

function ref(_ref, _key = _ref) {
  return { _key, _type: "reference", _ref };
}

async function seed() {
  const categories = [
    {
      _id: "category-branding",
      _type: "category",
      title: "Identidad de marca",
      slug: slug("branding"),
      description: "Proyectos de identidad visual, branding y sistemas de marca.",
      order: 1,
      coverImage: await uploadImage("/images/figma/project-soy-yo.png"),
    },
    {
      _id: "category-ux-ui",
      _type: "category",
      title: "UX UI Design",
      slug: slug("ux-ui"),
      description: "Productos digitales, aplicaciones, sitios web y experiencias interactivas.",
      order: 2,
      coverImage: await uploadImage("/images/figma/project-guia-bg.png"),
    },
  ];

  const services = [
    {
      _id: "service-art-direction",
      _type: "service",
      title: "Art Direction",
      slug: slug("art-direction"),
      description:
        "Desarrollo de conceptos y direcciones visuales para experiencias y campañas.",
      icon: await uploadImage("/images/figma/service-art-direction.png"),
      order: 1,
      relatedWizardAnswers: ["visual-system", "idea", "clarity"],
    },
    {
      _id: "service-branding",
      _type: "service",
      title: "Branding",
      slug: slug("branding"),
      description: "Creación de identidades visuales para marcas y proyectos.",
      icon: await uploadImage("/images/figma/service-branding.png"),
      order: 2,
      relatedWizardAnswers: ["brand", "identity", "launch"],
    },
    {
      _id: "service-ux-ui-web-design",
      _type: "service",
      title: "UX UI & Web Design",
      slug: slug("ux-ui-web-design"),
      description:
        "Diseño de productos digitales y sitios web centrados en la experiencia de usuario.",
      icon: await uploadImage("/images/figma/service-ux-ui.png"),
      order: 3,
      relatedWizardAnswers: ["digital-product", "in-progress", "conversion"],
    },
    {
      _id: "service-ilustracion",
      _type: "service",
      title: "Ilustración",
      slug: slug("ilustracion"),
      description:
        "Ilustraciones para enriquecer la comunicación visual de marcas y proyectos.",
      icon: await uploadImage("/images/figma/service-illustration.png"),
      order: 4,
      relatedWizardAnswers: ["illustration", "personality", "launch"],
    },
  ];

  const testimonials = [
    {
      _id: "testimonial-google",
      _type: "testimonial",
      quote:
        "Eliana transformó nuestra visión de marca en una realidad digital que superó todas las expectativas. Su enfoque minimalista es puro arte.",
      name: "Gemma Nolen",
      company: "GOOGLE",
      avatar: await uploadImage("/images/figma/client.png"),
      rating: 5,
    },
    {
      _id: "testimonial-apple",
      _type: "testimonial",
      quote:
        "Trabajar con Eliana fue una experiencia fluida. Su atención al detalle tipográfico y al recorrido de usuario es excepcional.",
      name: "Gemma Nolen",
      company: "APPLE",
      avatar: await uploadImage("/images/figma/client.png"),
      rating: 5,
    },
    {
      _id: "testimonial-nike",
      _type: "testimonial",
      quote:
        "Una profesional con una mirada editorial única. Sabe cómo hacer que el contenido respire y conecte con la audiencia.",
      name: "Gemma Nolen",
      company: "NIKE",
      avatar: await uploadImage("/images/figma/client.png"),
      rating: 5,
    },
  ];

  const projects = [
    {
      _id: "project-soy-yo-yo-soy",
      _type: "project",
      title: "SOY YO, YO SOY",
      slug: slug("soy-yo-yo-soy"),
      category: ref("category-branding"),
      year: "2025",
      description: "Identidad visual para un proyecto de marca personal.",
      role: "Diseño visual",
      services: ["Branding", "Identidad"],
      tools: ["Illustrator", "Photoshop"],
      coverImage: await uploadImage("/images/figma/project-soy-yo.png"),
      heroImage: await uploadImage("/images/figma/project-soy-yo.png"),
      gallery: [],
      featured: true,
      seoTitle: "SOY YO, YO SOY | Eliana Charquero",
      seoDescription: "Identidad visual para un proyecto de marca personal.",
    },
    {
      _id: "project-guia",
      _type: "project",
      title: "GuIA",
      slug: slug("guia"),
      category: ref("category-ux-ui"),
      year: "2025",
      description: "Producto digital orientado a movilidad segura.",
      role: "UX/UI",
      services: ["UX/UI", "Producto digital"],
      tools: ["Figma"],
      coverImage: await uploadImage("/images/figma/project-guia-bg.png"),
      heroImage: await uploadImage("/images/figma/project-guia-bg.png"),
      gallery: [await uploadImage("/images/figma/project-guia-overlay.png")].filter(Boolean),
      featured: true,
      seoTitle: "GuIA | Eliana Charquero",
      seoDescription: "Producto digital orientado a movilidad segura.",
    },
    {
      _id: "project-florecer-app",
      _type: "project",
      title: "Florecer App",
      slug: slug("florecer-app"),
      category: ref("category-ux-ui"),
      year: "2025",
      description: "Aplicación educativa con identidad visual propia.",
      role: "UX/UI",
      services: ["UX/UI", "Visual design"],
      tools: ["Figma"],
      coverImage: await uploadImage("/images/figma/project-florecer.png"),
      heroImage: await uploadImage("/images/figma/project-florecer.png"),
      gallery: [],
      featured: true,
      seoTitle: "Florecer App | Eliana Charquero",
      seoDescription: "Aplicación educativa con identidad visual propia.",
    },
  ];

  const siteSettings = {
    _id: "siteSettings-main",
    _type: "siteSettings",
    siteTitle: "Eliana Charquero Portfolio",
    siteDescription:
      "Portfolio de diseño visual, branding, UX/UI e ilustración de Eliana Charquero.",
    navigation: [
      { _key: "inicio", label: "INICIO", href: "/" },
      { _key: "sobre-mi", label: "SOBRE MÍ", href: "/about" },
      { _key: "trabajos", label: "TRABAJOS", href: "/projects" },
      { _key: "contacto", label: "CONTACTO", href: "/services#wizard" },
    ],
    socialLinks: [
      { _key: "email", label: "Email", href: "mailto:elicharquero@gmail.com" },
      {
        _key: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/elianacharquero/",
      },
      {
        _key: "behance",
        label: "Behance",
        href: "https://www.behance.net/elicharquero",
      },
    ],
    footerText: "© 2026 Eliana Charquero. Diseñado en Montevideo, Uruguay.",
    defaultSeoImage: await uploadImage("/images/figma/foto-eli.png"),
  };

  const homePage = {
    _id: "homePage-main",
    _type: "homePage",
    heroTitle: "Eliana Charquero",
    introTitle: "Hola, soy Eli ...",
    introBody:
      "Diseñadora de comunicación visual y UX/UI. Me apasiona crear experiencias digitales y visuales que conecten con las personas a través de la creatividad, la estrategia y el diseño.",
    heroImage: await uploadImage("/images/figma/foto-eli.png"),
    featuredProjects: projects.map((project) => ref(project._id, project._id)),
    servicesPreview: services.map((service) => ref(service._id, service._id)),
    testimonials: testimonials.map((testimonial) => ref(testimonial._id, testimonial._id)),
    contactTitle: "Hagamos algo juntxs",
  };

  const aboutPage = {
    _id: "aboutPage-main",
    _type: "aboutPage",
    title: "Sobre mí.",
    intro:
      "Soy una diseñadora apasionada por crear experiencias que conecten lo emocional con lo funcional. Actualmente profundizando en la intersección del diseño y la innovación estratégica.",
    profileImage: await uploadImage("/images/figma/foto-eli.png"),
    areas: ["UX/UI & Web Design", "Art Direction & Branding", "Ilustración"],
    toolkit: ["Figma", "Adobe Creative Cloud", "Miro", "WordPress", "AI Tools"],
  };

  const documents = [
    ...categories,
    ...services,
    ...testimonials,
    ...projects,
    siteSettings,
    homePage,
    aboutPage,
  ];

  for (const document of documents) {
    await client.createOrReplace(document);
    console.log(`Creado o actualizado: ${document._type} / ${document._id}`);
  }

  console.log(`Listo: ${documents.length} documentos cargados en Sanity.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
