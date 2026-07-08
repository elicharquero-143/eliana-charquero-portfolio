import type { Project } from "@/types/project";

export const dictionaries = {
  es: {
    nav: {
      home: "INICIO",
      work: "TRABAJOS",
      about: "SOBRE MÍ",
      contact: "CONTACTO",
      languageLabel: "Idioma",
      english: "ING",
      spanish: "ESP",
    },
    site: {
      name: "Eliana Charquero",
      copyright: "© 2026 Eliana Charquero. Diseñado en Montevideo, Uruguay.",
      socialLinks: [
        { label: "Email", href: "mailto:elicharquero@gmail.com" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/elianacharquero/",
        },
        { label: "Behance", href: "https://www.behance.net/elicharquero" },
      ],
    },
    home: {
      introTitle: "Hola, soy Eli ...",
      introBody:
        "Diseñadora de comunicación visual y UX/UI. Me apasiona crear experiencias digitales y visuales que conecten con las personas a través de la creatividad, la estrategia y el diseño.",
      aboutCta: "Conocer más",
      marquee: "Creemos juntxs",
      featuredTitle: "Algunos de mis trabajos",
      projectsCta: "Ver proyectos",
      testimonialsTitle: "Clientes",
      contactTitle: "Hagamos algo juntxs",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Escribe tu mensaje aquí",
        submit: "Enviar",
        sending: "Enviando...",
        success: "Mensaje enviado con éxito. Gracias por escribirme.",
        error:
          "No se pudo enviar el mensaje. Intenta nuevamente o escríbeme por email.",
      },
    },
    projectPage: {
      eyebrow: "TRABAJOS",
      title: "Mis trabajos",
      intro:
        "Una selección de proyectos de identidad, producto digital e ilustración donde estrategia visual y experiencia se encuentran.",
      scrollHint: "Desliza para explorar",
      viewProject: "Ver proyecto",
      backToProjects: "Volver a proyectos",
      projectInfo: "Información del proyecto",
      galleryTitle: "Más imágenes",
      role: "Rol",
      category: "Categoría",
      year: "Año",
      services: "Servicios",
      tools: "Herramientas",
      nextProject: "Siguiente proyecto",
      notFoundTitle: "Proyecto no encontrado",
      notFoundBody:
        "Este proyecto todavía no está disponible o cambió de ubicación.",
    },
    about: {
      eyebrow: "ESTRATEGIA & DISEÑO",
      title: "Sobre mí.",
      intro:
        "Soy una diseñadora apasionada por crear experiencias que conecten lo emocional con lo funcional. Actualmente profundizando en la intersección del diseño y la innovación estratégica.",
      missionTitle: "Misión y Enfoque",
      missionParagraphs: [
        "Como diseñadora visual y de experiencias, mi trabajo se centra en transformar problemas complejos en soluciones visualmente potentes y centradas en el usuario. Mi formación en Diseño Gráfico me dio las herramientas estéticas, pero mi curiosidad me llevó al mundo del UX/UI y la innovación estratégica.",
        "Creo firmemente que el diseño no es solo “cómo se ve”, sino “cómo funciona” dentro de un contexto de negocio y vida real. Mi Master en Diseño Estratégico e Innovación me permite hoy mirar el diseño desde una perspectiva más holística, enfocándome en el impacto a largo plazo.",
      ],
      areasTitle: "Áreas",
      areas: [
        {
          title: "UX/UI & Web Design",
          description:
            "Interfaces intuitivas, accesibles y estéticamente impecables que guían al usuario de forma orgánica.",
          icon: "/images/figma/about/icon-web.svg",
        },
        {
          title: "Art Direction & Branding",
          description:
            "Construcción de identidades visuales que cuentan historias coherentes y memorables.",
          icon: "/images/figma/about/icon-stars.svg",
        },
        {
          title: "Ilustración",
          description:
            "Exploración gráfica que añade una capa táctil y humana a los productos digitales modernos.",
          icon: "/images/figma/about/icon-illustration.svg",
        },
      ],
      academicTitle: "Trayectoria Académica",
      academic: [
        {
          period: "Actualidad",
          title: "Master en Diseño Estratégico e Innovación",
          description:
            "Profundizando en metodologías de Design Thinking y estrategia de negocio, diseño UX e innovación.",
          current: true,
        },
        {
          period: "2017 - 2024",
          title: "Licenciatura en Diseño y Comunicación visual",
          description:
            "Fundamentos sólidos en composición, tipografía y comunicación visual.",
        },
        {
          period: "Certificaciones",
          title: "Especialización en UX UI Design",
          description: "Enfoque en arquitectura de información y prototipado.",
        },
      ],
      toolkitTitle: "Herramientas",
      toolkit: ["Figma", "Adobe Creative Cloud", "Miro", "WordPress", "AI Tools"],
      ctaTitle: "¿Tienes un proyecto en mente?",
      ctaBody: "Me encantaría charlar sobre cómo podemos trabajar juntos.",
      ctaButton: "HABLEMOS",
    },
    servicesPage: {
      eyebrow: "SERVICIOS",
      title: "Encuentra el servicio ideal para tu proyecto.",
      intro:
        "Responde algunas preguntas rápidas y te ayudo a identificar qué tipo de acompañamiento de diseño puede encajar mejor con lo que necesitas.",
      wizardTitle: "Cuéntame sobre tu proyecto",
      wizardIntro:
        "Responde paso a paso y al final podrás dejar tus datos para que conversemos sobre tu proyecto.",
      stepsLabel: "Paso",
      ofLabel: "de",
      back: "Atrás",
      next: "Siguiente",
      restart: "Empezar de nuevo",
      selectPrompt: "Elige una opción para continuar.",
      recommendationTitle: "Servicio recomendado",
      recommendationIntro:
        "Según tus respuestas, este puede ser el mejor punto de partida:",
      secondaryRecommendations: "También puede complementar:",
      serviceChoiceTitle: "¿Qué servicio quieres solicitar?",
      formTitle: "Datos de contacto",
      formIntro: "Completa esta información para finalizar.",
      fields: {
        name: "Nombre",
        email: "Email",
        budget: "Presupuesto estimado",
        timeline: "Plazo ideal",
        message: "Cuéntame brevemente qué necesitas",
      },
      placeholders: {
        name: "Tu nombre",
        email: "tu@email.com",
        budget: "Ej: USD 800 - 1500",
        timeline: "Ej: para el próximo mes",
        message: "Contexto, objetivos, referencias o cualquier detalle útil.",
      },
      submit: "Enviar solicitud",
      sending: "Enviando...",
      successMessage:
        "¡Solicitud enviada con éxito! Gracias por confiar en mí, pronto me pondré en contacto.",
      errorMessage:
        "No se pudo enviar la solicitud. Intenta nuevamente o escríbeme por email.",
      close: "Cerrar",
      serviceChoices: [
        { id: "web", label: "Web", serviceSlugs: ["ux-ui-web-design"] },
        { id: "ux-ui", label: "UX UI", serviceSlugs: ["ux-ui-web-design"] },
        {
          id: "art-direction",
          label: "Diseño y dirección de arte",
          serviceSlugs: ["art-direction"],
        },
        { id: "branding", label: "Branding", serviceSlugs: ["branding"] },
        { id: "illustration", label: "Ilustración", serviceSlugs: ["ilustracion"] },
      ],
      steps: [
        {
          id: "need",
          question: "¿Qué necesita tu proyecto ahora?",
          options: [
            {
              id: "brand",
              label: "Crear o renovar una identidad visual",
              serviceSlugs: ["branding"],
            },
            {
              id: "digital-product",
              label: "Diseñar una web, app o producto digital",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "visual-system",
              label: "Dar coherencia visual a una campaña o lanzamiento",
              serviceSlugs: ["art-direction", "branding"],
            },
            {
              id: "illustration",
              label: "Sumar ilustraciones o recursos gráficos",
              serviceSlugs: ["ilustracion"],
            },
          ],
        },
        {
          id: "stage",
          question: "¿En qué etapa estás?",
          options: [
            {
              id: "idea",
              label: "Tengo una idea inicial y necesito bajarla a tierra",
              serviceSlugs: ["art-direction", "branding"],
            },
            {
              id: "in-progress",
              label: "Ya tengo algo avanzado y necesito mejorar la experiencia",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "launch",
              label: "Estoy por lanzar y necesito pulir la comunicación visual",
              serviceSlugs: ["branding", "ilustracion"],
            },
          ],
        },
        {
          id: "goal",
          question: "¿Qué resultado te gustaría lograr?",
          options: [
            {
              id: "clarity",
              label: "Claridad estratégica y una dirección visual sólida",
              serviceSlugs: ["art-direction"],
            },
            {
              id: "identity",
              label: "Una marca reconocible, consistente y flexible",
              serviceSlugs: ["branding"],
            },
            {
              id: "conversion",
              label: "Una experiencia digital clara, usable y atractiva",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "personality",
              label: "Un lenguaje gráfico más propio y memorable",
              serviceSlugs: ["ilustracion"],
            },
          ],
        },
      ],
    },
    services: [
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
    ],
    projects: [
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
    ] satisfies Project[],
    testimonials: [
      {
        quote:
          "Eliana transformó nuestra visión de marca en una realidad digital que superó todas las expectativas. Su enfoque minimalista es puro arte.",
        name: "Gemma Nolen",
        company: "GOOGLE",
      },
      {
        quote:
          "Trabajar con Eliana fue una experiencia fluida. Su atención al detalle tipográfico y al recorrido de usuario es excepcional.",
        name: "Gemma Nolen",
        company: "APPLE",
      },
      {
        quote:
          "Una profesional con una mirada editorial única. Sabe cómo hacer que el contenido respire y conecte con la audiencia.",
        name: "Gemma Nolen",
        company: "NIKE",
      },
    ],
  },
  en: {
    nav: {
      home: "HOME",
      work: "WORK",
      about: "ABOUT",
      contact: "CONTACT",
      languageLabel: "Language",
      english: "ING",
      spanish: "ESP",
    },
    site: {
      name: "Eliana Charquero",
      copyright: "© 2026 Eliana Charquero. Designed in Montevideo, Uruguay.",
      socialLinks: [
        { label: "Email", href: "mailto:elicharquero@gmail.com" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/elianacharquero/",
        },
        { label: "Behance", href: "https://www.behance.net/elicharquero" },
      ],
    },
    home: {
      introTitle: "Hi, I’m Eli ...",
      introBody:
        "Visual communication and UX/UI designer. I love creating digital and visual experiences that connect with people through creativity, strategy, and design.",
      aboutCta: "Learn more",
      marquee: "Let's create together",
      featuredTitle: "Some of my work",
      projectsCta: "View projects",
      testimonialsTitle: "Clients",
      contactTitle: "Let's make something together",
      form: {
        name: "Name",
        email: "Email",
        message: "Write your message here",
        submit: "Send",
        sending: "Sending...",
        success: "Message sent successfully. Thank you for reaching out.",
        error: "The message could not be sent. Please try again or email me.",
      },
    },
    projectPage: {
      eyebrow: "WORK",
      title: "My work",
      intro:
        "A selection of identity, digital product, and illustration projects where visual strategy and experience meet.",
      scrollHint: "Scroll to explore",
      viewProject: "View project",
      backToProjects: "Back to projects",
      projectInfo: "Project information",
      galleryTitle: "More images",
      role: "Role",
      category: "Category",
      year: "Year",
      services: "Services",
      tools: "Tools",
      nextProject: "Next project",
      notFoundTitle: "Project not found",
      notFoundBody:
        "This project is not available yet or has moved to another location.",
    },
    about: {
      eyebrow: "STRATEGY & DESIGN",
      title: "About me.",
      intro:
        "I’m a designer passionate about creating experiences that connect the emotional with the functional. I’m currently deepening my work at the intersection of design and strategic innovation.",
      missionTitle: "Mission and Approach",
      missionParagraphs: [
        "As a visual and experience designer, my work focuses on transforming complex problems into visually powerful, user-centered solutions. My background in Graphic Design gave me aesthetic tools, while curiosity led me into UX/UI and strategic innovation.",
        "I strongly believe design is not only about how something looks, but how it works within a real business and life context. My Master’s in Strategic Design and Innovation allows me to approach design from a more holistic perspective, focused on long-term impact.",
      ],
      areasTitle: "Areas",
      areas: [
        {
          title: "UX/UI & Web Design",
          description:
            "Intuitive, accessible, and visually refined interfaces that guide users organically.",
          icon: "/images/figma/about/icon-web.svg",
        },
        {
          title: "Art Direction & Branding",
          description:
            "Visual identities that tell coherent and memorable stories.",
          icon: "/images/figma/about/icon-stars.svg",
        },
        {
          title: "Illustration",
          description:
            "Graphic exploration that adds a tactile and human layer to modern digital products.",
          icon: "/images/figma/about/icon-illustration.svg",
        },
      ],
      academicTitle: "Academic Journey",
      academic: [
        {
          period: "Current",
          title: "Master’s in Strategic Design and Innovation",
          description:
            "Deepening my practice in Design Thinking methodologies, business strategy, UX design, and innovation.",
          current: true,
        },
        {
          period: "2017 - 2024",
          title: "Bachelor’s Degree in Design and Visual Communication",
          description:
            "A strong foundation in composition, typography, and visual communication.",
        },
        {
          period: "Certifications",
          title: "UX UI Design Specialization",
          description: "Focused on information architecture and prototyping.",
        },
      ],
      toolkitTitle: "Tools",
      toolkit: ["Figma", "Adobe Creative Cloud", "Miro", "WordPress", "AI Tools"],
      ctaTitle: "Have a project in mind?",
      ctaBody: "I’d love to talk about how we can work together.",
      ctaButton: "LET’S TALK",
    },
    servicesPage: {
      eyebrow: "SERVICES",
      title: "Find the right service for your project.",
      intro:
        "Answer a few quick questions and I’ll help you identify which kind of design support may fit what you need.",
      wizardTitle: "Tell me about your project",
      wizardIntro:
        "Answer step by step and at the end you can leave your details so we can talk about your project.",
      stepsLabel: "Step",
      ofLabel: "of",
      back: "Back",
      next: "Next",
      restart: "Start again",
      selectPrompt: "Choose an option to continue.",
      recommendationTitle: "Recommended service",
      recommendationIntro:
        "Based on your answers, this may be the best place to start:",
      secondaryRecommendations: "It can also be complemented with:",
      serviceChoiceTitle: "Which service would you like to request?",
      formTitle: "Contact details",
      formIntro: "Complete this information to finish.",
      fields: {
        name: "Name",
        email: "Email",
        budget: "Estimated budget",
        timeline: "Ideal timeline",
        message: "Briefly tell me what you need",
      },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        budget: "E.g. USD 800 - 1500",
        timeline: "E.g. within the next month",
        message: "Context, goals, references, or any useful detail.",
      },
      submit: "Send request",
      sending: "Sending...",
      successMessage:
        "Request sent successfully! Thank you for trusting me, I’ll be in touch soon.",
      errorMessage:
        "The request could not be sent. Please try again or email me.",
      close: "Close",
      serviceChoices: [
        { id: "web", label: "Web", serviceSlugs: ["ux-ui-web-design"] },
        { id: "ux-ui", label: "UX UI", serviceSlugs: ["ux-ui-web-design"] },
        {
          id: "art-direction",
          label: "Design and art direction",
          serviceSlugs: ["art-direction"],
        },
        { id: "branding", label: "Branding", serviceSlugs: ["branding"] },
        { id: "illustration", label: "Illustration", serviceSlugs: ["illustration"] },
      ],
      steps: [
        {
          id: "need",
          question: "What does your project need right now?",
          options: [
            {
              id: "brand",
              label: "Create or refresh a visual identity",
              serviceSlugs: ["branding"],
            },
            {
              id: "digital-product",
              label: "Design a website, app, or digital product",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "visual-system",
              label: "Bring visual consistency to a campaign or launch",
              serviceSlugs: ["art-direction", "branding"],
            },
            {
              id: "illustration",
              label: "Add illustrations or graphic assets",
              serviceSlugs: ["illustration"],
            },
          ],
        },
        {
          id: "stage",
          question: "What stage are you in?",
          options: [
            {
              id: "idea",
              label: "I have an initial idea and need to shape it",
              serviceSlugs: ["art-direction", "branding"],
            },
            {
              id: "in-progress",
              label: "I already have something and need to improve the experience",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "launch",
              label: "I’m about to launch and need to refine the visual communication",
              serviceSlugs: ["branding", "illustration"],
            },
          ],
        },
        {
          id: "goal",
          question: "What result would you like to achieve?",
          options: [
            {
              id: "clarity",
              label: "Strategic clarity and a strong visual direction",
              serviceSlugs: ["art-direction"],
            },
            {
              id: "identity",
              label: "A recognizable, consistent, and flexible brand",
              serviceSlugs: ["branding"],
            },
            {
              id: "conversion",
              label: "A clear, usable, and appealing digital experience",
              serviceSlugs: ["ux-ui-web-design"],
            },
            {
              id: "personality",
              label: "A more distinctive and memorable graphic language",
              serviceSlugs: ["illustration"],
            },
          ],
        },
      ],
    },
    services: [
      {
        title: "Art Direction",
        description:
          "Concept development and visual direction for experiences and campaigns.",
        icon: "/images/figma/service-art-direction.png",
        slug: "art-direction",
      },
      {
        title: "Branding",
        description: "Visual identity creation for brands and projects.",
        icon: "/images/figma/service-branding.png",
        slug: "branding",
      },
      {
        title: "UX UI & Web Design",
        description:
          "User-centered digital product and website design.",
        icon: "/images/figma/service-ux-ui.png",
        slug: "ux-ui-web-design",
      },
      {
        title: "Illustration",
        description:
          "Illustrations that enrich the visual communication of brands and projects.",
        icon: "/images/figma/service-illustration.png",
        slug: "illustration",
      },
    ],
    projects: [
      {
        title: "SOY YO, YO SOY",
        slug: "soy-yo-yo-soy",
        category: { title: "Brand identity", slug: "branding" },
        year: "2025",
        description: "Visual identity for a personal brand project.",
        role: "Visual design",
        services: ["Branding", "Identity"],
        tools: ["Illustrator", "Photoshop"],
        coverImage: "/images/figma/project-soy-yo.png",
        gallery: [],
        featured: true,
      },
      {
        title: "GuIA",
        slug: "guia",
        category: { title: "Safe mobility app", slug: "ux-ui" },
        year: "2025",
        description: "Digital product focused on safe mobility.",
        role: "UX/UI",
        services: ["UX/UI", "Digital product"],
        tools: ["Figma"],
        coverImage: "/images/figma/project-guia-bg.png",
        gallery: ["/images/figma/project-guia-overlay.png"],
        featured: true,
      },
      {
        title: "Florecer App",
        slug: "florecer-app",
        category: { title: "Educational support app", slug: "ux-ui" },
        year: "2025",
        description: "Educational app with its own visual identity.",
        role: "UX/UI",
        services: ["UX/UI", "Visual design"],
        tools: ["Figma"],
        coverImage: "/images/figma/project-florecer.png",
        gallery: [],
        featured: true,
      },
    ] satisfies Project[],
    testimonials: [
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
    ],
  },
} as const;
