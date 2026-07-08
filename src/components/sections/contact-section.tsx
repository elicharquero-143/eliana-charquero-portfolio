"use client";

import { FormEvent, useState } from "react";
import { DecorativeImage } from "@/components/layout/decorative-image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";

export function ContactSection() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const [status, setStatus] = useState<"error" | "idle" | "sending" | "success">(
    "idle",
  );

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
          name: String(formData.get("name") ?? ""),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        formElement.reset();
        setStatus("success");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-cream py-20 md:py-[80px]">
      <div className="home-scale grid gap-16 px-6 md:grid-cols-[514px_1fr] md:gap-24 md:px-[139px_64px]">
        <Reveal className="relative">
          <div className="relative max-w-[514px]">
            <h2 className="display-title text-ink">
              {dictionary.home.contactTitle}
            </h2>
            <DecorativeImage
              className="spin-slow pointer-events-none absolute left-[calc(100%+2px)] top-1/2 z-0 hidden h-auto w-[82px] -translate-y-1/2 opacity-90 md:block"
              height={130}
              src="/images/figma/shape-purple.svg"
              width={129}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="flex flex-col gap-6" onSubmit={submitContact}>
            <label className="sr-only" htmlFor="name">
              {dictionary.home.form.name}
            </label>
            <input
              className="h-[72px] rounded-lg bg-[#f3f3f3] px-6 font-work text-base text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="name"
              name="name"
              placeholder={dictionary.home.form.name}
              required
              type="text"
            />
            <label className="sr-only" htmlFor="email">
              {dictionary.home.form.email}
            </label>
            <input
              className="h-[72px] rounded-lg bg-[#f3f3f3] px-6 font-work text-base text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="email"
              name="email"
              placeholder={dictionary.home.form.email}
              required
              type="email"
            />
            <label className="sr-only" htmlFor="message">
              {dictionary.home.form.message}
            </label>
            <textarea
              className="min-h-[192px] resize-y rounded-lg bg-[#f3f3f3] px-6 py-6 font-work text-base leading-6 text-ink outline-none placeholder:text-[#6b7280] focus-visible:ring-2 focus-visible:ring-ink"
              id="message"
              name="message"
              placeholder={dictionary.home.form.message}
              required
            />
            {status === "success" ? (
              <p className="rounded-lg bg-lavender/50 px-5 py-4 font-work text-sm font-bold text-ink">
                {dictionary.home.form.success}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-lg bg-[#ffd285]/40 px-5 py-4 font-work text-sm font-bold text-ink">
                {dictionary.home.form.error}
              </p>
            ) : null}
            <div className="pt-4">
              <Button disabled={status === "sending"} type="submit">
                {status === "sending"
                  ? dictionary.home.form.sending
                  : dictionary.home.form.submit}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
