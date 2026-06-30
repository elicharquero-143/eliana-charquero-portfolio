"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-language");
    if (stored === "es" || stored === "en") {
      setLanguageState(stored);
      document.documentElement.lang = stored;
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    const nextLanguage = browserLanguage.startsWith("en") ? "en" : "es";
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem("portfolio-language", nextLanguage);
        document.documentElement.lang = nextLanguage;
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
