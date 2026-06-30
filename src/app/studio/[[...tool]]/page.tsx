import { SanityStudio } from "@/components/sanity/studio";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-6 text-ink">
        <div className="max-w-[620px] text-center">
          <h1 className="font-serif text-5xl font-bold leading-tight">
            Sanity Studio está preparado
          </h1>
          <p className="mt-5 font-sans text-lg leading-7 text-muted">
            Para activarlo, agrega NEXT_PUBLIC_SANITY_PROJECT_ID y
            NEXT_PUBLIC_SANITY_DATASET en tus variables de entorno.
          </p>
        </div>
      </main>
    );
  }

  return <SanityStudio />;
}
