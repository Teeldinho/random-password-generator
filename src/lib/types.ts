import { z } from "zod";

export const passwordOptions = [
  { id: "includeUppercase", label: "Include Uppercase Letters" },
  { id: "includeLowercase", label: "Include Lowercase Letters" },
  { id: "includeNumbers", label: "Include Numbers" },
  { id: "includeSymbols", label: "Include Symbols" },
] as const;

export const PasswordFormSchema = z.object({
  characterLength: z.number().min(0).max(20).default(0),
  options: z
    .array(z.string())
    .refine((data) => data.length > 0, {
      message: "Select at least one character type.",
    })
    .default(["includeUppercase", "includeLowercase", "includeNumbers"]),
});

export type PasswordFormType = z.infer<typeof PasswordFormSchema>;

export enum PasswordStrength {
  Empty = "EMPTY",
  TooWeak = "TOO_WEAK",
  Weak = "WEAK",
  Medium = "MEDIUM",
  Strong = "STRONG",
}
