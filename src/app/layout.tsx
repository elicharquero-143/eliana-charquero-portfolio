import type { Metadata } from "next";
import { CursorFollower } from "@/components/layout/cursor-follower";
import { LanguageProvider } from "@/i18n/language-provider";
import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <CursorFollower />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
