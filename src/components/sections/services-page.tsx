"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceWizard } from "@/components/sections/service-wizard";

export function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <SiteHeader />
      <ServiceWizard />
      <SiteFooter />
    </main>
  );
}
