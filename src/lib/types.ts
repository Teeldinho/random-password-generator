import { z } from "zod";

export const PASSWORD_CHAR_LENGTH_MIN = 1;
export const PASSWORD_CHAR_LENGTH_MAX = 20;

export const passwordOptions = [
  { id: "includeUppercase", label: "Include Uppercase Letters" },
  { id: "includeLowercase", label: "Include Lowercase Letters" },
  { id: "includeNumbers", label: "Include Numbers" },
  { id: "includeSymbols", label: "Include Symbols" },
] as const;

const optionsSchema = passwordOptions.reduce((acc, option) => {
  acc[option.id] = z.boolean();
  return acc;
}, {} as { [key: string]: z.ZodBoolean });

export const PasswordFormSchema = z.object({
  characterLength: z.coerce
    .number()
    .min(PASSWORD_CHAR_LENGTH_MIN, {
      message: "Password length must be at least 1 character.",
    })
    .max(PASSWORD_CHAR_LENGTH_MAX),
  options: z.object(optionsSchema).refine((data) => Object.values(data).some((value) => value), {
    message: "Select at least one character type.",
  }),
});

export type PasswordFormType = z.infer<typeof PasswordFormSchema>;

export enum PasswordStrength {
  Empty = "EMPTY",
  TooWeak = "TOO_WEAK",
  Weak = "WEAK",
  Medium = "MEDIUM",
  Strong = "STRONG",
}

export const PasswordStrengthDescriptionSchema = z.object({
  password: z.string(),
  strength: z.nativeEnum(PasswordStrength),
});

export type PasswordStrengthDescriptionType = z.infer<typeof PasswordStrengthDescriptionSchema>;
