import { z } from "zod";

export const PASSWORD_CHAR_LENGTH_MIN = 1;
export const PASSWORD_CHAR_LENGTH_MAX = 20;
export const PASSWORD_CHAR_LENGTH_DEFAULT = PASSWORD_CHAR_LENGTH_MIN;

export const PASSWORD_VALIDATION_MESSAGES = {
  LENGTH_MIN: `Password length must be at least ${PASSWORD_CHAR_LENGTH_MIN} character.`,
  OPTION_REQUIRED: "Select at least one character type.",
} as const;

export const passwordOptions = [
  { id: "includeUppercase", label: "Include Uppercase Letters" },
  { id: "includeLowercase", label: "Include Lowercase Letters" },
  { id: "includeNumbers", label: "Include Numbers" },
  { id: "includeSymbols", label: "Include Symbols" },
] as const;

export type PasswordOptionId = (typeof passwordOptions)[number]["id"];
export type PasswordOptionsRecord = Record<PasswordOptionId, boolean>;

const optionsSchema = passwordOptions.reduce((acc, option) => {
  acc[option.id] = z.boolean();
  return acc;
}, {} as Record<PasswordOptionId, z.ZodBoolean>);

export const PASSWORD_DEFAULT_OPTIONS: PasswordOptionsRecord = {
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
};

export const PasswordFormSchema = z.object({
  characterLength: z.coerce
    .number()
    .min(PASSWORD_CHAR_LENGTH_MIN, {
      message: PASSWORD_VALIDATION_MESSAGES.LENGTH_MIN,
    })
    .max(PASSWORD_CHAR_LENGTH_MAX),
  options: z.object(optionsSchema).refine((data) => Object.values(data).some((value) => value), {
    message: PASSWORD_VALIDATION_MESSAGES.OPTION_REQUIRED,
  }),
});

export type PasswordFormType = z.infer<typeof PasswordFormSchema>;

export const PASSWORD_DEFAULT_FORM_VALUES: PasswordFormType = {
  characterLength: PASSWORD_CHAR_LENGTH_DEFAULT,
  options: PASSWORD_DEFAULT_OPTIONS,
};

export const PasswordStrength = {
  Empty: "EMPTY",
  TooWeak: "TOO_WEAK",
  Weak: "WEAK",
  Medium: "MEDIUM",
  Strong: "STRONG",
} as const;

export type PasswordStrength = (typeof PasswordStrength)[keyof typeof PasswordStrength];

const PASSWORD_STRENGTH_VALUES = [
  PasswordStrength.Empty,
  PasswordStrength.TooWeak,
  PasswordStrength.Weak,
  PasswordStrength.Medium,
  PasswordStrength.Strong,
] as const;

export const PasswordStrengthDescriptionSchema = z.object({
  password: z.string(),
  strength: z.enum(PASSWORD_STRENGTH_VALUES),
});

export type PasswordStrengthDescriptionType = z.infer<typeof PasswordStrengthDescriptionSchema>;
