export const routes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  services: "/services",
  contact: "/contact",
} as const;

export const mainNavigation = [
  { label: "HOME", href: routes.home },
  { label: "WORK", href: routes.projects },
  { label: "ABOUT", href: routes.about },
  { label: "CONTACT", href: routes.contact },
] as const;
