import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />
      <section className="home-scale flex min-h-[60vh] items-center px-6 py-24 md:px-16">
        <h1 className="display-title text-ink">{title}</h1>
      </section>
      <SiteFooter />
    </main>
  );
}
