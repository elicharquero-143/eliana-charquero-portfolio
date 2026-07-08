"use client";

import { Check, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { dictionaries } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type WizardAnswers = Record<string, string>;
type WizardForm = {
  name: string;
  email: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialForm: WizardForm = {
  name: "",
  email: "",
  budget: "",
  timeline: "",
  message: "",
};

export function ServiceWizard() {
  const { language } = useLanguage();
  const dictionary = dictionaries[language];
  const content = dictionary.servicesPage;
  const services = dictionary.services;
  const totalSteps = content.steps.length + 2;
  const serviceChoiceStepIndex = content.steps.length;
  const formStepIndex = totalSteps - 1;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [form, setForm] = useState<WizardForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "error" | "idle" | "sending" | "success"
  >("idle");

  const isQuestionStep = stepIndex < content.steps.length;
  const isServiceChoiceStep = stepIndex === serviceChoiceStepIndex;
  const isFormStep = stepIndex === formStepIndex;
  const showRecommendation = stepIndex >= serviceChoiceStepIndex;
  const currentStep = isQuestionStep ? content.steps[stepIndex] : null;
  const currentAnswer = currentStep ? answers[currentStep.id] : "";
  const canContinue = isQuestionStep
    ? Boolean(currentAnswer)
    : isServiceChoiceStep
      ? Boolean(selectedServiceId)
      : false;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const selectedOptions = useMemo(
    () =>
      content.steps
        .map((step) => step.options.find((option) => option.id === answers[step.id]))
        .filter(Boolean),
    [answers, content.steps],
  );

  const recommendations = useMemo(() => {
    const scores = new Map<string, number>();

    selectedOptions.forEach((option) => {
      option?.serviceSlugs.forEach((slug) => {
        scores.set(slug, (scores.get(slug) ?? 0) + 1);
      });
    });

    return services
      .map((service) => ({
        ...service,
        score: scores.get(service.slug) ?? 0,
      }))
      .filter((service) => service.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selectedOptions, services]);

  const primaryRecommendation = recommendations[0] ?? services[0];
  const secondaryRecommendations = recommendations.slice(1, 3);

  function selectOption(optionId: string) {
    if (!currentStep) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentStep.id]: optionId,
    }));
  }

  function goNext() {
    if (!canContinue) {
      return;
    }

    setStepIndex((current) => Math.min(current + 1, formStepIndex));
  }

  function goBack() {
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function restart() {
    setAnswers({});
    setSelectedServiceId("");
    setForm(initialForm);
    setStepIndex(0);
    setSubmitted(false);
    setSubmitStatus("idle");
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("sending");

    const selectedService =
      content.serviceChoices.find((service) => service.id === selectedServiceId)
        ?.label ?? selectedServiceId;
    const answersSummary = content.steps.map((step) => ({
      answer:
        step.options.find((option) => option.id === answers[step.id])?.label ??
        answers[step.id] ??
        "",
      question: step.question,
    }));

    try {
      const response = await fetch("/api/service-wizard", {
        body: JSON.stringify({
          answers: answersSummary,
          budget: form.budget,
          email: form.email,
          message: form.message,
          name: form.name,
          recommendedService: primaryRecommendation.title,
          selectedService,
          timeline: form.timeline,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmitStatus("success");
        return;
      }

      setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-periwinkle px-6 py-20 md:px-[138px] md:py-[118px]"
      id="wizard"
    >
      <Image
        alt=""
        aria-hidden
        className="spin-slow pointer-events-none absolute -right-14 top-16 hidden h-auto w-[210px] md:block"
        height={200}
        src="/images/figma/about/shape-yellow-about.svg"
        width={176}
      />
      <div className="home-scale relative z-10 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal className="max-w-[470px]" y={18}>
          <p className="font-sans text-lg leading-7 text-white/90">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-[56px] font-normal leading-[0.96] text-white md:text-[86px]">
            {content.title}
          </h1>
          <p className="mt-7 text-pretty font-sans text-lg leading-7 text-ink">
            {content.intro}
          </p>
        </Reveal>

        <Reveal className="rounded-[18px] bg-cream p-5 shadow-soft md:p-8" delay={0.08}>
          <div className="flex flex-col gap-5 border-b border-sage/40 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-plum">
                <Sparkles aria-hidden className="size-4" />
                <span>
                  {content.stepsLabel} {stepIndex + 1} {content.ofLabel} {totalSteps}
                </span>
              </div>
              <h2 className="mt-3 font-sans text-[30px] font-bold leading-[38px] text-ink">
                {content.wizardTitle}
              </h2>
              <p className="mt-2 max-w-[540px] text-sm leading-6 text-muted">
                {content.wizardIntro}
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-lavender/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              onClick={restart}
              type="button"
            >
              <RotateCcw aria-hidden className="size-4" />
              {content.restart}
            </button>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-sage/40">
            <div
              className="h-full rounded-full bg-ink transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className={cn(
              "mt-8 grid gap-8",
              showRecommendation
                ? "xl:grid-cols-[minmax(340px,1fr)_320px]"
                : "xl:grid-cols-1",
            )}
          >
            <div>
              {isQuestionStep && currentStep ? (
                <WizardQuestion
                  currentAnswer={currentAnswer}
                  onSelect={selectOption}
                  options={currentStep.options}
                  question={currentStep.question}
                />
              ) : null}

              {isServiceChoiceStep ? (
                <WizardQuestion
                  currentAnswer={selectedServiceId}
                  onSelect={setSelectedServiceId}
                  options={content.serviceChoices}
                  question={content.serviceChoiceTitle}
                />
              ) : null}

              {isFormStep ? (
                <form onSubmit={submitRequest}>
                  <div className="max-w-[620px]">
                    <h3 className="font-sans text-2xl font-bold leading-8 text-ink">
                      {content.formTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {content.formIntro}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 2xl:grid-cols-2">
                    <WizardField
                      label={content.fields.name}
                      name="name"
                      onChange={(value) =>
                        setForm((current) => ({ ...current, name: value }))
                      }
                      placeholder={content.placeholders.name}
                      required
                      value={form.name}
                    />
                    <WizardField
                      label={content.fields.email}
                      name="email"
                      onChange={(value) =>
                        setForm((current) => ({ ...current, email: value }))
                      }
                      placeholder={content.placeholders.email}
                      required
                      type="email"
                      value={form.email}
                    />
                    <WizardField
                      label={content.fields.budget}
                      name="budget"
                      onChange={(value) =>
                        setForm((current) => ({ ...current, budget: value }))
                      }
                      placeholder={content.placeholders.budget}
                      value={form.budget}
                    />
                    <WizardField
                      label={content.fields.timeline}
                      name="timeline"
                      onChange={(value) =>
                        setForm((current) => ({ ...current, timeline: value }))
                      }
                      placeholder={content.placeholders.timeline}
                      value={form.timeline}
                    />
                    <label className="2xl:col-span-2">
                      <span className="font-sans text-base font-black leading-[26px] text-ink">
                        {content.fields.message}
                      </span>
                      <textarea
                        className="mt-2 min-h-[132px] w-full resize-y rounded-2xl border-0 bg-field px-5 py-4 text-base text-ink outline-none ring-1 ring-transparent transition focus:ring-ink"
                        name="message"
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            message: event.target.value,
                          }))
                        }
                        placeholder={content.placeholders.message}
                        value={form.message}
                      />
                    </label>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button
                      disabled={stepIndex === 0}
                      onClick={goBack}
                      type="button"
                      variant="secondary"
                    >
                      <ChevronLeft aria-hidden className="mr-1 size-5" />
                      {content.back}
                    </Button>
                    <Button disabled={submitStatus === "sending"} type="submit">
                      {submitStatus === "sending" ? content.sending : content.submit}
                    </Button>
                  </div>
                  {submitStatus === "error" ? (
                    <p className="mt-5 rounded-lg bg-yolk/35 px-5 py-4 text-sm font-bold text-ink">
                      {content.errorMessage}
                    </p>
                  ) : null}
                </form>
              ) : (
                <>
                  {!canContinue ? (
                    <p className="mt-4 text-sm font-bold text-plum">
                      {content.selectPrompt}
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      disabled={stepIndex === 0}
                      onClick={goBack}
                      type="button"
                      variant="secondary"
                    >
                      <ChevronLeft aria-hidden className="mr-1 size-5" />
                      {content.back}
                    </Button>
                    <Button disabled={!canContinue} onClick={goNext} type="button">
                      {content.next}
                      <ChevronRight aria-hidden className="ml-1 size-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {showRecommendation ? (
              <aside className="rounded-xl bg-lavender/55 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-plum">
                  {content.recommendationTitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-ink">
                  {content.recommendationIntro}
                </p>
                <div className="mt-5 rounded-xl bg-white p-5">
                  <Image
                    alt=""
                    aria-hidden
                    className="h-11 w-11 object-contain"
                    height={52}
                    src={primaryRecommendation.icon}
                    width={52}
                  />
                  <h4 className="mt-4 font-serif text-3xl font-bold leading-9 text-ink">
                    {primaryRecommendation.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {primaryRecommendation.description}
                  </p>
                </div>
                {secondaryRecommendations.length > 0 ? (
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-plum">
                      {content.secondaryRecommendations}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {secondaryRecommendations.map((service) => (
                        <span
                          className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink"
                          key={service.slug}
                        >
                          {service.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </Reveal>
      </div>
      {submitted ? (
        <div
          aria-labelledby="service-request-success"
          aria-modal="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 px-6 backdrop-blur-sm"
          role="dialog"
        >
          <div className="w-full max-w-[520px] rounded-[18px] bg-cream p-8 text-center shadow-soft">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-ink text-white">
              <Check aria-hidden className="size-7" />
            </div>
            <h2
              className="mt-6 font-sans text-[28px] font-bold leading-9 text-ink"
              id="service-request-success"
            >
              {content.successMessage}
            </h2>
            <Button className="mt-7" onClick={() => setSubmitted(false)} type="button">
              {content.close}
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type WizardOption = {
  readonly id: string;
  readonly label: string;
  readonly serviceSlugs: readonly string[];
};

type WizardQuestionProps = {
  currentAnswer: string;
  onSelect: (optionId: string) => void;
  options: readonly WizardOption[];
  question: string;
};

function WizardQuestion({
  currentAnswer,
  onSelect,
  options,
  question,
}: WizardQuestionProps) {
  return (
    <>
      <h3 className="font-sans text-2xl font-bold leading-8 text-ink">
        {question}
      </h3>
      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const isSelected = currentAnswer === option.id;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "flex min-h-[72px] w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                isSelected
                  ? "border-ink bg-ink text-white"
                  : "border-sage/50 bg-white text-ink hover:border-ink/70 hover:bg-lavender/30",
              )}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              <span className="text-base font-bold leading-6">{option.label}</span>
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border",
                  isSelected
                    ? "border-white bg-white text-ink"
                    : "border-ink/30 text-transparent",
                )}
              >
                <Check aria-hidden className="size-4" />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

type WizardFieldProps = {
  label: string;
  name: keyof WizardForm;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
};

function WizardField({
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: WizardFieldProps) {
  return (
    <label>
      <span className="font-sans text-base font-black leading-[26px] text-ink">
        {label}
      </span>
      <input
        className="mt-2 h-14 w-full rounded-2xl border-0 bg-field px-5 text-base text-ink outline-none ring-1 ring-transparent transition focus:ring-ink"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}
