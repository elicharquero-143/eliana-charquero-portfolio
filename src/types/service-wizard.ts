export type WizardOption = {
  id: string;
  label: string;
  serviceSlugs: string[];
};

export type WizardStep = {
  id: string;
  question: string;
  options: WizardOption[];
};

export type WizardLead = {
  name: string;
  email: string;
  message?: string;
  answers: Record<string, string>;
};
