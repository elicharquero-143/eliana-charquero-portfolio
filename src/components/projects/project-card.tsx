import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  ctaLabel?: string;
  project: Project;
  variant?: "grid" | "carousel" | "static";
};

export function ProjectCard({
  ctaLabel = "Ver proyecto",
  project,
  variant = "grid",
}: ProjectCardProps) {
  if (variant === "static") {
    return (
      <article className="block w-full">
        <ProjectImage project={project} variant={variant} />
        <ProjectCaption project={project} variant={variant} />
      </article>
    );
  }

  return (
    <Link
      className={cn(
        "group block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
      )}
      href={`/projects/${project.slug}`}
    >
      <ProjectImage ctaLabel={ctaLabel} project={project} variant={variant} />
      <ProjectCaption project={project} variant={variant} />
    </Link>
  );
}

type ProjectImageProps = {
  ctaLabel?: string;
  project: Project;
  variant: "grid" | "carousel" | "static";
};

function ProjectImage({ ctaLabel = "Ver proyecto", project, variant }: ProjectImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white",
        variant === "carousel" ? "aspect-[1.45]" : "aspect-square",
      )}
    >
      <Image
        alt={project.title}
        className={cn(
          "h-full w-full object-cover",
          variant !== "static" &&
            "transition-transform duration-500 group-hover:scale-[1.04]",
        )}
        fill
        sizes={variant === "carousel" ? "680px" : "326px"}
        src={project.coverImage}
      />
      {project.gallery[0] ? (
        <Image
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          fill
          sizes="326px"
          src={project.gallery[0]}
        />
      ) : null}
      {variant === "grid" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-white/80">
              {project.category.title}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold leading-9 md:text-4xl">
              {project.title}
            </h3>
          </div>
        </>
      ) : null}
      {variant !== "static" ? (
        <div className="absolute inset-0 grid place-items-center bg-ink/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/70 bg-white/15 px-5 py-3 font-sans text-sm font-bold text-white backdrop-blur-md">
            {ctaLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}

type ProjectCaptionProps = {
  project: Project;
  variant: "grid" | "carousel" | "static";
};

function ProjectCaption({ project, variant }: ProjectCaptionProps) {
  return (
    <div className={variant === "carousel" ? "mt-5" : "mt-7"}>
      <h3
        className={cn(
          "font-sans font-medium text-ink",
          variant === "carousel"
            ? "text-3xl font-bold uppercase leading-9"
            : "text-2xl leading-[26px]",
        )}
      >
        {project.title}
      </h3>
      <p
        className={cn(
          "mt-1 font-sans text-muted",
          variant === "carousel"
            ? "text-base font-bold uppercase tracking-[0.08em] leading-6"
            : "text-lg leading-7",
        )}
      >
        {project.category.title}
      </p>
    </div>
  );
}
